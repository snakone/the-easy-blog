import { Component, ChangeDetectionStrategy, Input, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { QuillModules } from 'ngx-quill';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { QuillService } from '@core/services/quill/quill.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UserService } from '@core/services/api/users.service';
import { ShareService } from '@core/services/share/share.service';

import { Post } from '@shared/types/interface.post';
import { User } from '@shared/types/interface.user';
import { DRAFT_ICONS, POST_ICONS } from '@shared/data/data';
import { DELETE_CONFIRMATION, EDIT_POST_CONFIRMATION, PREVIEW_DRAFT_DIALOG } from '@shared/data/dialogs';
import { CREATE_ROUTE, POST_KEY, PROFILE_ROUTE } from '@shared/data/constants';
import { DraftStatusEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardComponent {

  crafter = inject(CrafterService);
  draftsFacade = inject(DraftsFacade);
  router = inject(Router);
  quillSrv = inject(QuillService);
  postFacade = inject(PostsFacade);
  userSrv = inject(UserService);
  shareSrv = inject(ShareService);
  destroyRef = inject(DestroyRef);

  @Input() post: Post | undefined;
  @Input() border = true;
  @Input() alone = false;  // Single Post
  @Input() small = false;  // Small Card
  @Input() last!: boolean;
  @Input() isDraft!: boolean;  // Draft Card
  @Input() favoritesID: string[] = [];
  @Input() showIntro: boolean = true;

  user: User | undefined;

  postIcons = POST_ICONS;
  draftIcons = DRAFT_ICONS;
  draftStatus = DraftStatusEnum;

  quillModules: QuillModules = {
    syntax: true,
  };

  /**
   * Object to map Draft icons to actions.
  */
  switchObjDraft: {[key: string]: () => void} = {
    edit: () => this.editDraft(),
    preview: () => this.preview(),
    download: () => this.download(),
    delete: () => this.delete(),
    favorite: () => this.favorite()
  };

  /**
   * Object to map Post icons to actions.
  */
  switchObjPost: {[key: string]: () => void} = {
    message: () => this.message(),
    download: () => this.download(),
  };

  ngOnInit(): void { 
    this.getUser();
  }

  /**
   * Get the current user from {userSrv}
  */
  private getUser(): void {
    this.user = this.userSrv.getUser();
  }

  /**
   * Edit the selected {draft}. Excepts if status is pending.
  */
  private editDraft(): void {
    if (this.post.status === DraftStatusEnum.PENDING) { return; }
    this.draftsFacade.setActive(this.post);
    this.router.navigateByUrl(CREATE_ROUTE);
  }

  /**
   * Opens a confirmation to edit the {post}
   * Only works if the 'type' is {POST_KEY}
  */
    public editPost(): void {
      if (this.post.type !== POST_KEY) { return; }
  
      this.crafter.confirmation(EDIT_POST_CONFIRMATION)
       ?.afterClosed()
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(Boolean)
      ).subscribe(_ => this.editSuccess());
    }

  /**
   * Open a dialog to preview the selected Post/Draft.
  */
  private preview(): void {
    this.draftsFacade.setPreview(this.post);
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG);
  }

  /**
   * Download the  Post/Draft as HTML using {quillSrv.convertToHTML}
  */
  private download(): void {
    this.quillSrv.convertToHTML(this.post);
  }

  /**
   * Add a Post/Draft to your favourites.
  */
  public favorite(): void {
    this.postFacade.addFavorite(this.post._id);
  }

  /**
   * Remove a Post/Draft from your favourites.
  */
  public removeFavorite(): void {
    this.postFacade.removeFavorite(this.post._id);
  }

  /**
   * Delete the selected {draft} by ID. Ask for confirmation.
  */
  private delete(): void {
    this.crafter.confirmation(DELETE_CONFIRMATION)
     ?.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean)
    ).subscribe(_ => this.draftsFacade.delete(this.post._id));
  }

  /**
   * Opens a native pop up for sharing the Post/Craft. HTML5.
  */
  public async share(): Promise<void> {
    await this.shareSrv.share(this.post)?.catch(err => console.log(err));
  }

  private message(): void {
    console.log('message');
  }

  /**
   * Navigates to author {post profile}
  */
  public goToAuthorProfile(): void {
    this.router.navigateByUrl(PROFILE_ROUTE + '/' + this.post.user);
  }

  /**
   * Function to fire after edit {post} confirmation.
   * Set 'temporal' to the {post} and navigate to it.
  */
  private editSuccess(): void {
    this.post.temporal = true;
    this.draftsFacade.setActive(this.post);
    this.draftsFacade.addTemporal(this.post);
    this.router.navigate([CREATE_ROUTE], {replaceUrl: true});
  }

}
