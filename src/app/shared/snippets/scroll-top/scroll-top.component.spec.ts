import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScrollTopComponent } from './scroll-top.component';
import { DirectivesModule } from '@shared/directives/directives.module';

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivesModule],
      declarations: [ ScrollTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top 0 when click on the button', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    window.scrollTo({top: 300, behavior: 'instant'});
    element.querySelector("button").dispatchEvent(new MouseEvent('click'));
    tick(1000);
    expect(window.scrollY).toBe(0);
  }));
});
