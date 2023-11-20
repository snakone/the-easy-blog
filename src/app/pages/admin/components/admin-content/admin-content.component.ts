import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { Post, StatusButtons } from '@shared/types/interface.types';
import { Subject, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminContentComponent implements OnInit {

  drafts: Post[] | undefined;
  filteredDrafts: Post[];
  private unsubscribe$ = new Subject<void>();

  status: StatusButtons[] = [
    {status: 'not-seen', active: false},
    {status: 'seen', active: false}, 
    {status: 'pending', active: false},
    {status: 'all', active: false}
  ];

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.draftsFacade.all$.pipe(
      takeUntil(this.unsubscribe$),
      map(drafts => drafts?.filter(d => d.status !== 'approved'))
    ).subscribe(res => {
      this.drafts = res;
      this.filteredDrafts = res;
    });
  }

  public sort(value: StatusButtons): void {
    this.status.forEach(s => s.active = false);
    value.active = true;
    
    if (value.status === 'all') {
      this.filteredDrafts = this.drafts;
      window.dispatchEvent(new Event('resize'));
      return;
    }
    this.filteredDrafts = this.drafts
    .filter((draft: Post) => draft.status === value.status);

    window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}


