import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushDeniedDialogComponent } from './push-denied.component';
import { PipesModule } from '@shared/pipes/pipes.module';

describe('PushDeniedDialogComponent', () => {
  let component: PushDeniedDialogComponent;
  let fixture: ComponentFixture<PushDeniedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushDeniedDialogComponent ],
      imports: [
        PipesModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushDeniedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a h2 title', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector("h2");
    expect(title.textContent).toBe("Permitir Notificaciones");
  });

  it('should have an image', () => {
    const karma = "http://localhost:9876/";
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector("img");
    expect(title.src).toBe(karma + "assets/images/add-sub.png");
  });

  it('should have a button to close', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector("button");
    expect(button.hasAttribute("mat-dialog-close")).toBeTrue();
  });

});
