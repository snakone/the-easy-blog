import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySkeletonComponent } from './activity-skeleton.component';

describe('ActivitySkeletonComponent', () => {
  let component: ActivitySkeletonComponent;
  let fixture: ComponentFixture<ActivitySkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitySkeletonComponent]
    });
    fixture = TestBed.createComponent(ActivitySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the "last" class when last is true', () => {
    fixture = TestBed.createComponent(ActivitySkeletonComponent);
    component = fixture.componentInstance;
    component.last = true;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const article = element.children[0];
    expect(article.className).toBe("last");
  });
});
