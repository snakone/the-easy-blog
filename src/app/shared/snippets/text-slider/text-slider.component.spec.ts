import { ComponentFixture, DeferBlockState, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TextSliderComponent } from './text-slider.component';
import { loadDefer } from '@core/testing/testing.utils';

const intervalTime = 5000;

describe('TextSliderComponent', () => {
  let component: TextSliderComponent;
  let fixture: ComponentFixture<TextSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TextSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await loadDefer(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update index +1 after clicking on the RIGHT arrow', () => {
    expect(component.index).toBe(0);
    const sliderElement: HTMLElement = fixture.nativeElement;
    const clickElement = sliderElement?.querySelector(' .fa-chevron-circle-right');
    clickElement?.dispatchEvent(new MouseEvent('click'));
    expect(component.index).toBe(1);
  });

  it('should update index -1 after clicking on the LEFT arrow', () => {
    expect(component.index).toBe(0);
    const sliderElement: HTMLElement = fixture.nativeElement;
    const clickElement = sliderElement?.querySelector(' .fa-chevron-circle-left');
    clickElement?.dispatchEvent(new MouseEvent('click'));
    expect(component.index).toBe(component.items.length - 1);
  });

  it('should update index every {intervalTime}', fakeAsync(() => {
    fixture = TestBed.createComponent(TextSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let initialIndex = component.index;
    expect(component.index).toBe(0);
    tick(intervalTime + 100);
    expect(component.index).toBe(initialIndex + 1);
  }));

});
