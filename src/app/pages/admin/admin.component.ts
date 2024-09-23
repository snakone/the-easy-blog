import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminComponent {

  constructor(
    private draftsFacade: DraftsFacade,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.draftsFacade.getAll()
  }

  ngOnDestroy(): void {
    this.draftsFacade.reset();
  }

}
