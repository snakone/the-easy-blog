import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SnackOverlayComponent } from './snack.component';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { DestroyRef } from '@angular/core';
import { SnackTypeEnum } from '@shared/types/types.enums';
import { Snack } from '@shared/types/interface.app';

describe('SnackOverlayComponent', () => {
  let component: SnackOverlayComponent;
  let fixture: ComponentFixture<SnackOverlayComponent>;
  let crafter: CrafterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackOverlayComponent ],
      providers: [
        CrafterService,
        DestroyRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    crafter = TestBed.inject(CrafterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display by default', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.children.length).toBe(0);
  });

  it('should display Snack when Observable', fakeAsync(() => {
    const mockSnack: Snack = { message: "Test Snack", type: SnackTypeEnum.SUCCESS }
    fixture = TestBed.createComponent(SnackOverlayComponent);
    const element: HTMLElement = fixture.nativeElement;
    component = fixture.componentInstance;
    crafter.setSnack(mockSnack.message, mockSnack.type);
    fixture.detectChanges();
    tick(101);
    expect(component.data).toBeDefined();
    expect(component.data).toEqual(mockSnack);
    fixture.detectChanges();
    expect(element.children.length).toBeGreaterThan(0);
    tick(4000);
  }));
});
