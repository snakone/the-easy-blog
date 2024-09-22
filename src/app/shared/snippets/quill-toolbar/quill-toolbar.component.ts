import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, DestroyRef, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, Observable, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { Post } from '@shared/types/interface.post';
import { QuillService } from '@core/services/quill/quill.service';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { SavingType } from '@shared/types/interface.app';

import { AUTO_SAVE_KEY, MESSAGE_KEY } from '@shared/data/constants';
import { SavingTypeEnum } from '@shared/types/types.enums';
import { CREATE_ACTION_LIST } from '@shared/data/data';
import { StorageService } from '@core/services/storage/storage.service';

import { 
  SAVE_CONFIRMATION, 
  DELETE_CONFIRMATION, 
  PREVIEW_DRAFT_DIALOG, 
  QUILL_HELP_DIALOG, 
  CHECK_DRAFT_STATUS_CONFIRMATION
} from '@shared/data/dialogs';

@Component({
  selector: 'app-quill-toolbar',
  templateUrl: './quill-toolbar.component.html',
  styleUrls: ['./quill-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillToolbarComponent {

  crafter = inject(CrafterService);
  draftsFacade = inject(DraftsFacade);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  quillSrv = inject(QuillService);
  createDraftSrv = inject(CreateDraftService);
  destroyRef = inject(DestroyRef);
  ls = inject(StorageService);

  @Input() draft: Post;
  @Input() form = false;
  @Output() clean = new EventEmitter<void>();
  saving$: Observable<SavingType>;
  totalDrafts$: Observable<number> | undefined;
  saveTypes = SavingTypeEnum;
  
  iconList = CREATE_ACTION_LIST;

  constructor() {}

  ngOnInit(): void {
    this.saving$ = this.draftsFacade.saving$;
    this.getTotalDrafts();
    this.checkAutoSave();
  }

  /**
   * Checks the {AUTO_SAVE_KEY} on the Local Storage.
   * Updates the Saving State accordingly.
  */
  public checkAutoSave(): void {
    if (!this.ls.getSettings(AUTO_SAVE_KEY) as boolean) {
      this.draftsFacade.setSaving({value: false, type: SavingTypeEnum.TEMPORAL});
    }
  }

  /**
   * Get the total amount of User Drafts from the store.
  */
  private getTotalDrafts(): void {
    this.totalDrafts$ = this.draftsFacade.drafts$.pipe(
      map(drafts => drafts?.length || 0)
    );
  }

  /**
   * Object used on the HTML to map the icons to actions.
   * @param key The icon key
   * @param saving Saving State
  */
  switchAction: {[key: string]: (saving?: boolean) => void} = {
    new: (saving: boolean) => this.new(saving),
    preview: (saving: boolean) => this.preview(saving),
    clean: (saving: boolean) => {if (!saving) this.clean.emit()},
    delete: (saving: boolean) => this.delete(saving),
    download: (saving: boolean) => this.download(saving),
    help: (saving: boolean) => this.help(saving),
    status: (saving: boolean) => this.status(saving),
    form: () => this.goToForm()
  };

  /**
   * Option to create a Draft from scratch. Ask for confirmation.
   * After confirm, saves the current {draft} and reset it.
   * 
   * Excepts: {saving} is true, or the {draft} is temporal.
   * @param saving Saving State
  */
  private new(saving: boolean): void {
    if (!this.draft || saving || this.draft.temporal) { return; }
    this.crafter.confirmation(SAVE_CONFIRMATION)
     ?.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.draftsFacade.updateKey(
          {id: this.draft._id, keys: { key: MESSAGE_KEY, value: this.draft.message }}
        ))
    ).subscribe(_ => this.draftsFacade.resetActive());
  }

  /**
   * Opens the preview dialog. Disabled if {saving} is true.
   * @param saving Saving State
  */
  private preview(saving: boolean): void {
    if (!this.draft || saving) { return; }
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG);
  }

  /**
   * Opens the help dialog. Disabled if {saving} is true.
   * @param saving Saving State
  */
  private help(saving: boolean): void {
    if (saving) { return; }
    this.crafter.dialog(QUILL_HELP_DIALOG);
  }

  /**
   * Download the curren Draft as HTML. Disabled if {saving} is true.
   * @param saving Saving State
  */
  private download(saving: boolean): void {
    if (!this.draft || saving) { return; }
    this.quillSrv.convertToHTML(this.draft);
  }

  /**
   * Navigates to the {draft} single page to check the status.
   * Ask for confirmation.
   * @param saving Saving State
  */
  private status(saving: boolean): void {
    if (!this.draft || saving || !this.draft.slug) { return; }
    this.crafter.confirmation(CHECK_DRAFT_STATUS_CONFIRMATION)
     ?.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
    ).subscribe(_ => this.router.navigateByUrl("draft/" + this.draft.slug));
  }

  /**
   * Sends the draft id to save it manually.
  */
  public saveManualDraft(): void {
    this.createDraftSrv.onSaveManual(this.draft?._id || null);
  }

  /**
   * Delete the current Draft. Ask for confirmation.
   * 
   * Sends the draft id to make ZoomOut animation.
   * @param saving Saving State
  */

  private delete(saving: boolean): void {
    if (!this.draft || saving) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    ?.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.createDraftSrv.onDeleteDraft(this.draft._id))
    ).subscribe(_ => this.draftsFacade.delete(this.draft._id));
  }

  /**
   * Change route to /form. Does nothing if no {draft}
  */
  private goToForm(): void {
    if (!this.draft) { return; }
    this.router.navigate(['form'], {relativeTo: this.activatedRoute});
  }

  /**
   * Reset the Saving State 
  */
  ngOnDestroy() {
    this.draftsFacade.resetSaving();
  }

}
