import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.post';
import { CreateDraftService } from './services/create-draft.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateComponent {
  
  drafts$!: Observable<Post[]>;
  title!: string;
  collapsed$: Observable<boolean> | undefined;

  constructor(
    private draftsFacade: DraftsFacade,
    private createDraftSrv: CreateDraftService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void { 
    this.checkData();
    this.drafts$ = this.draftsFacade.drafts$;
    this.collapsed$ = this.createDraftSrv.onCollapse$;
  }

  private checkData(): void {
    this.draftsFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.draftsFacade.get());
  }

  ngOnDestroy(): void {
    this.draftsFacade.resetActive();
    this.draftsFacade.resetPreview();
  }

}
