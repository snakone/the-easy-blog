import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display by default', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.children.length).toBe(0);
  });

  it('should display the spinner when loading is True', () => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    component.loading = true;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.children.length).toBeGreaterThan(0);
  });
});
