import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post, UpdateDraftKeyData } from '@shared/types/interface.post';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DraftPreviewDialogData } from '@shared/types/interface.app';
import { STATUS_KEY } from '@shared/data/constants';
import { DraftStatusEnum } from '@shared/types/types.enums';
import { QuillModules } from 'ngx-quill';

const TIME_TO_BE_SEEN = 10000;

@Component({
  selector: 'app-draft-preview',
  templateUrl: './draft-preview.component.html',
  styleUrls: ['./draft-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftPreviewDialogComponent {

  preview$: Observable<Post>;
  timer: NodeJS.Timer;

  quillModules: QuillModules = {
    syntax: true,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DraftPreviewDialogData,
    private draftsFacade: DraftsFacade
  ) { }

  ngOnInit(): void {
    this.preview$ = this.draftsFacade.preview$;
  }

  ngAfterViewInit() {
    if (!this.data?.updateStatus) { return; }
    
    const draft = this.data.draft;
    const status = draft?.status;
    
    if (status === DraftStatusEnum.NOT_SEEN) {
      const data: UpdateDraftKeyData = {
        id: draft?._id,
        keys: { key: STATUS_KEY, value: DraftStatusEnum.SEEN },
        admin: true
      };

      this.waitAndSetStatus(data);
    }
  }

  private waitAndSetStatus(data: UpdateDraftKeyData): void {
    this.timer = setTimeout(() => this.draftsFacade.updateKey(data), TIME_TO_BE_SEEN);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer as any);
    }
  }

}
