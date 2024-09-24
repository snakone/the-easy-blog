import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsContentComponent } from './errors-content.component';

describe('ErrorsContentComponent', () => {
  let component: ErrorsContentComponent;
  let fixture: ComponentFixture<ErrorsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
