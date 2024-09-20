import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIndexSkeletonComponent } from './post-index-skeleton.component';

describe('PostIndexSkeletonComponent', () => {
  let component: PostIndexSkeletonComponent;
  let fixture: ComponentFixture<PostIndexSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostIndexSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostIndexSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a item list to display as skeletons', () => {
    expect(component.items).toBeDefined();
    expect(component.items.length).toBe(8);
    expect(component.items.every(item => Boolean(item.width))).toBeTrue();
  });

  it('should display a list on the HTML', () => {
    const element: HTMLElement = fixture.nativeElement;
    const div = element.children[0];
    expect(div.children.length).toBe(8);
  });

});
