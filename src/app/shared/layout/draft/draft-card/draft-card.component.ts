import { Component, Input } from '@angular/core';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { DELETE_CONFIRMATION, PREVIEW_DRAFT_DIALOG } from '@shared/data/dialogs';
import { SavingType } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { takeUntil, filter, Subject } from 'rxjs';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.scss']
})

export class DraftCardComponent {

  @Input() draft: Post | undefined;
  @Input() id: string | undefined; // DELETE
  @Input() saving: SavingType | undefined;
  @Input() first: boolean;
  @Input() collapsed = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private draftsFacade: DraftsFacade,
    private crafter: CrafterService,
    private createDraftSrv: CreateDraftService
  ) { }

  public activate(draft: Post): void {
    if (this.saving?.value || draft.status === 'pending') { return; }
    this.draftsFacade.setActive(draft);
  }

  public preview(): void {
    if (!this.draft || this.saving) { return; }
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG);
  }

  public delete(): void {
    if (!this.draft || this.saving) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => (
        this.draftsFacade.delete(this.draft._id),
        this.createDraftSrv.onDeleteDraft(this.draft._id)
    ));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
