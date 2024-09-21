import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DestroyRef } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { PostCardComponent } from './post-card.component';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { QuillService } from '@core/services/quill/quill.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UserService } from '@core/services/api/users.service';
import { ShareService } from '@core/services/share/share.service';
import { appReducers } from '@core/ngrx/ngrx.index';
import { HttpService } from '@core/services/http/http.service';
import { StorageService } from '@core/services/storage/storage.service';
import { MOCK_DRAFT, MOCK_POST } from '@core/testing/mocks/post.mock';
import { loadDefer } from '@core/testing/testing.utils';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuillModule } from 'ngx-quill';
import { CREATE_ROUTE, PROFILE_ROUTE } from '@shared/data/constants';
import { DELETE_CONFIRMATION, EDIT_POST_CONFIRMATION, PREVIEW_DRAFT_DIALOG } from '@shared/data/dialogs';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  let userService: UserService;
  let router: Router;
  let crafter: CrafterService;
  let quillService: QuillService;
  let postsFacade: PostsFacade;
  let shareService: ShareService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCardComponent ],
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot(appReducers),
        PipesModule,
        MatTooltipModule,
        QuillModule
      ],
      providers: [
        DraftsFacade,
        CrafterService,
        QuillService,
        PostsFacade,
        UserService,
        ShareService,
        DestroyRef,
        HttpService,
        StorageService,
        provideHttpClient(withInterceptorsFromDi()),
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    crafter = TestBed.inject(CrafterService);
    quillService = TestBed.inject(QuillService);
    postsFacade = TestBed.inject(PostsFacade);
    shareService = TestBed.inject(ShareService);

    component.post = MOCK_DRAFT;
    component.last = false;
    component.isDraft = true;
    component.alone = true;
    component.favoritesID = ["test-id"];
    fixture.detectChanges();
    await loadDefer(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get User', fakeAsync(() => {
    spyOn(userService, 'getUser');
    component.ngOnInit();
    tick(100);
    expect(userService.getUser).toHaveBeenCalled();
    const element: HTMLElement = fixture.nativeElement;
  }));

  it('should have "alone" class on the <article> when is {alone}', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const article = element.querySelector("article");
    expect(article.className).toBe("default alone");
  }));

  it('should not show the share button when is {draft}', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const share = element.querySelector(".inner");
    expect(share).toBeNull();
  }));

  it('should show the {draft} status if not "small" and is a {draft}', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const status = element.querySelector("p.date");
    expect(status.children[0].textContent.trim()).toBe("No visto"); 
  }));

  it('should show <quill-view> when is {alone}', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const view = element.querySelector("quill-view");
    expect(view).toBeDefined();
  }));

  it('should show Draft related icons when is {draft}', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const edit = list.querySelector(".fa-pen-fancy");
    const trash = list.querySelector(".fa-trash");

    expect(edit).toBeDefined();
    expect(trash).toBeDefined();
  }));

  it('should have "favorite" class when {favoritesID} includes the Draft/Post id', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const favourite = list.querySelector("i.favorite");
    expect(favourite).toBeDefined();
    expect(favourite.getAttribute("ng-reflect-message")).toBe("Eliminar favorito");
  }));

  it('should navigate to {CREATE_ROUTE} when edit {draft}', fakeAsync(() => {
    spyOn(router, 'navigateByUrl');
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const edit = list.querySelector(".fa-pen-fancy");
    edit.parentNode.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(router.navigateByUrl).toHaveBeenCalledWith(CREATE_ROUTE);
  }));
  
  it('should open a preview dialog of the {draft}', fakeAsync(() => {
    spyOn(crafter, 'dialog');
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const preview = list.querySelector(".fa-external-link-alt");
    preview.parentNode.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(crafter.dialog).toHaveBeenCalledWith(PREVIEW_DRAFT_DIALOG);
  }));
  
  it('should download the Draft/Post as HTML', fakeAsync(() => {
    spyOn(quillService, 'convertToHTML');
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const download = list.querySelector(".fa-cloud-download-alt");
    download.parentNode.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(quillService.convertToHTML).toHaveBeenCalledWith(component.post);
  }));

  it('should remove from favourites when click and the Draft/Post is already favourite', fakeAsync(() => {
    spyOn(postsFacade, 'removeFavorite');
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const favorite = list.querySelector(".fa-star");
    favorite.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(postsFacade.removeFavorite).toHaveBeenCalledWith(component.post._id);
  }));

  it('should add to favourites when click and the Draft/Post is not favourite', fakeAsync(() => {
    spyOn(postsFacade, 'addFavorite');
    component.favoritesID = [];
    fixture.detectChanges();
    tick(1000);
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const favorite = list.querySelector(".fa-star");
    favorite.dispatchEvent(new MouseEvent("click"));
    expect(postsFacade.addFavorite).toHaveBeenCalledWith(component.post._id);
  }));

  it('should show confirmation dialog when click on delete {draft}', fakeAsync(() => {
    spyOn(crafter, 'confirmation');
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const preview = list.querySelector(".fa-trash");
    preview.parentNode.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(crafter.confirmation).toHaveBeenCalledWith(DELETE_CONFIRMATION);
  }));

  it('should show share button when is {draft} and not {alone}', () => {
    component.post = MOCK_POST;
    component.alone = false;
    component.isDraft = false;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const share = element.querySelector(".inner");
    expect(share).toBeDefined();
  });

  it('should open a pop up to share the content when click on "share"', fakeAsync(() => {
    component.post = MOCK_POST;
    component.alone = false;
    component.isDraft = false;
    fixture.detectChanges();
    tick(1000);
    const spy = spyOn(shareService, 'share');
    const element: HTMLElement = fixture.nativeElement;
    const share = element.querySelector(".inner");
    const link = share.querySelector(".fa-link");
    link.parentNode.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(spy).toHaveBeenCalledWith(component.post);
  }));

  it('should navigate to author\'s profile when click on it\'s name.', fakeAsync(() => {
    component.post = MOCK_POST;
    component.isDraft = false;
    fixture.detectChanges();
    tick(1000);
    spyOn(router, 'navigateByUrl');
    const element: HTMLElement = fixture.nativeElement;
    const author = element.querySelector(".author");
    author.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(router.navigateByUrl).toHaveBeenCalledWith(PROFILE_ROUTE + '/' + component.post.user);
  }));

  it('should show confirmation dialog when click on edit {post}', fakeAsync(() => {
    component.post = MOCK_POST;
    component.isDraft = false;
    component.user = { _id: 'test-user', email: 'test@gmail.com', name: 'test' };
    fixture.detectChanges();
    tick(1000);
    spyOn(crafter, 'confirmation');
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    const preview = list.querySelector(".fa-pen-fancy");
    preview.parentNode.dispatchEvent(new MouseEvent("click"));
    tick(100);
    expect(crafter.confirmation).toHaveBeenCalledWith(EDIT_POST_CONFIRMATION);
  }));

});
