import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContentComponent } from './about-content.component';

describe('AboutContentComponent', () => {
  let component: AboutContentComponent;
  let fixture: ComponentFixture<AboutContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
