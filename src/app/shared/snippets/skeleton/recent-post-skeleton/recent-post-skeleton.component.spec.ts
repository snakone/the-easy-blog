import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPostSkeletonComponent } from './recent-post-skeleton.component';

describe('RecentPostSkeletonComponent', () => {
  let component: RecentPostSkeletonComponent;
  let fixture: ComponentFixture<RecentPostSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentPostSkeletonComponent]
    });
    fixture = TestBed.createComponent(RecentPostSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a item list to display as skeletons', () => {
    expect(component.items).toBeDefined();
    expect(component.items.length).toBe(component.limit);
    expect(component.items.every(item => Boolean(item))).toBeTrue();
  });

  it('should display a list on the HTML', () => {
    const element: HTMLElement = fixture.nativeElement;
    const div = element.children[0];
    expect(div.children.length).toBe(component.limit);
  });

});
