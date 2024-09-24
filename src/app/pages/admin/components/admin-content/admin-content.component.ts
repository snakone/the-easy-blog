import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { StatusButtons } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { map } from 'rxjs';

import { RESIZE_EVENT } from '@shared/data/constants';
import { DraftStatusEnum } from '@shared/types/types.enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminContentComponent {

  drafts: Post[] | undefined;
  filteredDrafts: Post[];

  status: StatusButtons[] = [
    {status: DraftStatusEnum.NOT_SEEN, active: false},
    {status: DraftStatusEnum.SEEN, active: false}, 
    {status: DraftStatusEnum.PENDING, active: false},
    {status: DraftStatusEnum.ALL, active: true}
  ];

  constructor(private draftsFacade: DraftsFacade, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.draftsFacade.all$.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(drafts => drafts?.filter(d => d.status !== DraftStatusEnum.APPROVED))
    ).subscribe(res => {
      this.drafts = res;
      this.filteredDrafts = res;
    });
  }

  public sort(value: StatusButtons): void {
    this.status.forEach(s => s.active = false);
    value.active = true;
    
    if (value.status === DraftStatusEnum.ALL) {
      this.filteredDrafts = this.drafts;
      window.dispatchEvent(new Event(RESIZE_EVENT));
      return;
    }
    this.filteredDrafts = this.drafts
    .filter((draft: Post) => draft.status === value.status);

    window.dispatchEvent(new Event(RESIZE_EVENT));
  }

}


