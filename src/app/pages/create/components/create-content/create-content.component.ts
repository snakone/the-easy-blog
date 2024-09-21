import { Component, ViewChild, DestroyRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap, withLatestFrom } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import Quill from 'quill';
import { DeltaStatic } from 'quill';

import { Post } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { DRAFT_PUSH } from '@shared/data/notifications';
import { PWAService } from '@core/services/pwa/pwa.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

import { EDIT_POST_CONFIRMATION } from '@shared/data/dialogs';
import { SavingTypeEnum, SavingDraftType, SnackTypeEnum } from '@shared/types/types.enums';
import { AUTO_SAVE_KEY, MESSAGE_KEY, RESIZE_EVENT } from '@shared/data/constants';
import { EMPTY_QUILL, HEADER_3_QUILL_ICON, QUILL_MODULES } from '@shared/data/quills';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { StorageService } from '@core/services/storage/storage.service';
import { DRAFT_UPDATE_SENTENCE } from '@shared/data/sentences';

const Quill_Icons = Quill.import('ui/icons');
const tick = 5000;

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  draft!: Post;
  show = false;
  model = EMPTY_QUILL as unknown as DeltaStatic;
  active$: Observable<Post> | undefined;
  quillModules: QuillModules;
  isTemporal = false;
  autoSave = false;

  constructor(
    private draftsFacade: DraftsFacade,
    private sw: PWAService,
    private crafter: CrafterService,
    private postFacade: PostsFacade,
    private destroyRef: DestroyRef,
    private createDraftSrv: CreateDraftService,
    private ls: StorageService
  ) { }

  ngOnInit() {
    this.getActive();
    this.addHeader3ToQuill();
  }

  ngAfterContentInit(): void {
    this.getQuillModules();
    this.listenEditor();
    this.listenToManualSave();
    this.autoSave = this.ls.getSettings(AUTO_SAVE_KEY) as boolean;
  }

  private getQuillModules(): void {
    this.quillModules = QUILL_MODULES(this.editor);
  }

  private getActive(): void {
    this.active$ = this.draftsFacade.active$.pipe(
      tap(res => (this.draft = res)),
      filter(Boolean),
      tap(_ => this.checkIfTemporal())
    );
  }

  private listenEditor(): void {
    this.editor.onContentChanged
     .pipe(
       takeUntilDestroyed(this.destroyRef),
       filter(_ => _.source !== 'api' && this.autoSave),
       withLatestFrom(this.draftsFacade.saving$),
       tap(([_, saving]) => (!saving?.value && !this.isTemporal) ? this.save(true) : null),
       debounceTime(tick),
       distinctUntilChanged(),
       map(([_, sv]) => _.content as any)
     )
     .subscribe((delta: DeltaStatic) => this.onChange(delta));
  }

  private onChange(
    delta: DeltaStatic
  ): void {
    !this.draft ? this.createNewDraft(delta) : this.updateDraft(delta);
  }

  private createNewDraft(
    delta: DeltaStatic
  ): void {
    if (delta.ops[0] && delta.ops[0].insert === '\n') {
      this.save(false);
      return;
    }
    const draft = { title: 'Boceto ', message: delta };
    this.draftsFacade.create(draft);
    this.save(false);
    this.draftsFacade.setPreview(draft);
    // firstValueFrom(this.sw.send(DRAFT_PUSH)).then();
  }

  private updateDraft(
    delta: DeltaStatic
  ): void {
    if (this.draft.temporal) {
      this.save(false);
      return;
     }
     
    const draft = this.setDeltaAndUpdate(delta);
    this.save(false);
    this.draftsFacade.setPreview(draft);
  }

  private setDeltaAndUpdate(
    delta: DeltaStatic
  ): Post {
    const draft = Object.assign({}, this.draft);
    draft.message = delta;
    this.draftsFacade.updateKey({id: this.draft._id, keys: {key: MESSAGE_KEY, value: delta}});
    return draft;
  }

  private save(
    value: boolean, 
    type: SavingDraftType | 
          SavingTypeEnum.TEMPORAL = SavingTypeEnum.SAVING
  ): void {
    if (this.autoSave) {
      this.draftsFacade.setSaving({type, value});
    }
  }

  public clean(): void {
   this.editor.quillEditor.setContents(null);
  }

  private checkIfTemporal(): void {
    if (this.draft.temporal) {
      this.isTemporal = true;
      this.save(false, SavingTypeEnum.TEMPORAL);
    } else {
      this.save(false, null);
      this.isTemporal = false;
    }
  }

  private listenToManualSave(): void {
    this.createDraftSrv.onSaveManual$
     .pipe(
      takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.updateAndShowDialog())
  }

  private updateAndShowDialog(): void {
    const delta: DeltaStatic = this.editor.quillEditor.getContents();

    if (!this.draft) {
      this.createNewDraft(delta);
      return;
    }

    const draft = Object.assign({}, this.draft);
    draft.message = delta;
    if (this.draft.temporal) {
      this.showDraftTemportalDialog(draft);
    } else if(!this.autoSave) {
      this.updateDraft(delta);
      this.crafter.setSnack(DRAFT_UPDATE_SENTENCE, SnackTypeEnum.SUCCESS)
    }
  }

  private showDraftTemportalDialog(draft: Post): void {
    this.crafter.confirmation(EDIT_POST_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
    ).subscribe(_ => this.postFacade.unPublish(draft));
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event(RESIZE_EVENT));
  }

  private addHeader3ToQuill(): void {
    Quill_Icons.header[3] = HEADER_3_QUILL_ICON;
  }

  ngOnDestroy() {
    this.draftsFacade.resetPreview();
  }

}

