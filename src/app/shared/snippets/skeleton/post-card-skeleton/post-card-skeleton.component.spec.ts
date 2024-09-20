import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardSkeletonComponent } from './post-card-skeleton.component';

describe('PostCardSkeletonComponent', () => {
  let component: PostCardSkeletonComponent;
  let fixture: ComponentFixture<PostCardSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCardSkeletonComponent]
    });
    fixture = TestBed.createComponent(PostCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the "small" class when small is true', () => {
    fixture = TestBed.createComponent(PostCardSkeletonComponent);
    component = fixture.componentInstance;
    component.small = true;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const article = element.children[0];
    expect(article.className).toBe("small");
  });

  it('should apply the "last" class when last is true', () => {
    fixture = TestBed.createComponent(PostCardSkeletonComponent);
    component = fixture.componentInstance;
    component.last = true;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const article = element.children[0];
    expect(article.className).toBe("last");
  });

});
