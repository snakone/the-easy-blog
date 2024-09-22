import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { switchMap, filter, firstValueFrom, tap, retry, debounceTime } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PWAService } from '@core/services/pwa/pwa.service';
import { Post } from '@shared/types/interface.post';
import { DraftCheck } from '@shared/types/interface.server';

import { PUBLISH_PUSH } from '@shared/data/notifications';
import { CHECKSTATUS } from '@shared/data/data';
import { ID_KEY } from '@shared/data/constants';
import { DraftStatus, DraftStatusEnum, SnackTypeEnum } from '@shared/types/types.enums';
import { PUBLISH_CONFIRMATION, DELETE_CONFIRMATION, PREVIEW_DRAFT_DIALOG_UPDATE } from '@shared/data/dialogs';
import { ADMIN_DRAFT_MESSAGE_DESC, BAD_COVER_CAUSE, BAD_COVER_SIZE, UNKWON_ERROR_SENTENCE } from '@shared/data/sentences';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getQuillHeaders } from '@shared/utils/quill.util.functions';

const maxImageSize = 150;

@Component({
  selector: 'app-admin-draft',
  templateUrl: './admin-draft.component.html',
  styleUrls: ['./admin-draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminDraftComponent {

  draft: Post | undefined;
  checkStatus = CHECKSTATUS;
  public coverSize: number;
  adminDraftMessageDesc = ADMIN_DRAFT_MESSAGE_DESC;
  eveythingOK: boolean;
  markAsPending: boolean;
  originalPending: boolean;

  xhr: XMLHttpRequest = new XMLHttpRequest();

  constructor(
    private draftsFacade: DraftsFacade,
    private route: ActivatedRoute,
    private crafter: CrafterService,
    private router: Router,
    private sw: PWAService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.getDraftByID();
  }

  private getDraftByID(): void {
    this.route.paramMap
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((res: ParamMap) => this.draftsFacade.byID$(res.get(ID_KEY))),
      debounceTime(333),
      retry(1)
    ).pipe(
      filter(Boolean),
      tap((res: Post) => this.setPendingStatus(res.status))
    )
    .subscribe((res: Post) => (this.draft = res, this.checkCover(res)));
  }

  public preview(): void {
    if (!this.draft) { return; }
    this.draftsFacade.setPreview(this.draft);
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG_UPDATE(this.draft));
  }

  private setPendingStatus(status: DraftStatusEnum): void {
    this.markAsPending = status === DraftStatusEnum.PENDING;
    this.originalPending = status === DraftStatusEnum.PENDING;
  }

  public publish(): void {
    const allChecksPassed = this.allDraftChecksOK(this.draft.check);
    this.clearCausesForPassedChecks(this.draft.check);

    allChecksPassed ? this.showPublishConfirmation() :
                      this.updateDraftAndStatus();
  }

  private clearCausesForPassedChecks(checks: DraftCheck): void {
    Object.values(checks).forEach(c => {
      if (c.ok) {
        c.cause = null;
      }
    });
  }

  private showPublishConfirmation(): void {
    const draft = Object.assign({}, this.draft);
    draft.headers = getQuillHeaders(draft.message.ops);
    this.crafter.confirmation(PUBLISH_CONFIRMATION)
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.draftsFacade.publish(draft))
      ).subscribe(_ => firstValueFrom(
        this.sw.send(this.sw.set(Object.assign({}, PUBLISH_PUSH), draft))
      ).then(_ => this.navigate()));
  }

  private updateDraftAndStatus(): void {
    const updatedPost: Post = {
      ...this.draft,
      check: this.draft.check,
      status: this.shouldMarkPending()
    }

    this.draftsFacade.update(updatedPost, true);
    setTimeout(() => this.navigate(), 1000);
  }

  private shouldMarkPending(): DraftStatus {
    return (
      this.markAsPending && 
      !this.originalPending
    ) || this.markAsPending ? 
    DraftStatusEnum.PENDING : 
      this.draft.status === DraftStatusEnum.SEEN ? this.draft.status : DraftStatusEnum.NOT_SEEN;
  }

  private async checkCover(draft: Post): Promise<void> {
    try {
      const sizeInBytes = await this.sendRequest(draft.cover || '');
      this.coverSize = Number((sizeInBytes / 1024).toFixed(2));

      if (Number(this.coverSize) > maxImageSize) {
        this.handleBadCover(BAD_COVER_SIZE);
      }
  
      if (isNaN(sizeInBytes)) {
        this.coverSize = 0;
        this.handleBadCover(BAD_COVER_CAUSE);
      }
    } catch (err) {
      console.log(err);
      this.crafter.setSnack(UNKWON_ERROR_SENTENCE, SnackTypeEnum.ERROR)
    }
  }

  private sendRequest(cover: string): Promise<number> {
    return new Promise((resolve) => {
      this.xhr.open('HEAD', cover, true);
      this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState === this.xhr.DONE) {
          const size = parseInt(this.xhr.getResponseHeader('Content-Length')!, 10);
          resolve(!isNaN(size) ? size : 0);
        }
      };
      this.xhr.send();
    });
  }

  public allDraftChecksOK(value: DraftCheck): boolean {
    return Object.values(value).every(i => i.ok);
  }

  private handleBadCover(cause: string): void {
    this.draft.check.hasGoodCover.ok = false;
    this.draft.check.hasGoodCover.cause = cause;
  }

  private navigate(): void {
    this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true});
  }

  public deleteDraftByID(): void {
    if (!this.draft) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.draftsFacade.delete(this.draft._id, true)),
    ).subscribe(_ => this.navigate());
  }

  ngOnDestroy(): void {
    this.xhr?.abort();
  }

}
