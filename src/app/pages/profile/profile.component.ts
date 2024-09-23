import { Component, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { filter } from 'rxjs';

import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { UserService } from '@core/services/api/users.service';

import { LIKE_TEXT } from '@shared/data/sentences';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@shared/types/interface.user';
import { ActivitiesFacade } from '@core/ngrx/activities/activities.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent {

  activityFacade = inject(ActivitiesFacade);

  text = LIKE_TEXT;

  constructor(
    private postFacade: PostsFacade,
    private draftsFacade: DraftsFacade,
    private userSrv: UserService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.checkData();
  }

  private checkData(): void {
    const user = this.userSrv.getUser();
    this.checkPostByUser(user);
    this.checkDrafts(user);
  }

  private checkPostByUser(user: User): void {
    this.postFacade.byUserLoaded$
     .pipe(
       filter(res => !res && Boolean(user)),
       takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.postFacade.getByUser(user._id));
  }

  private checkDrafts(user: User): void {
    this.draftsFacade.loaded$
    .pipe(
      filter(res => !res && Boolean(user)),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(_ => this.draftsFacade.get());
  }

  ngOnDestroy(): void {
    this.activityFacade.reset();
  }

}
