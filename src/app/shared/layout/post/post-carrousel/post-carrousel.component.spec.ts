import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCarrouselComponent } from './post-carrousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { loadDefer } from '@core/testing/testing.utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from '@shared/pipes/pipes.module';

describe('PostCarrouselComponent', () => {
  let component: PostCarrouselComponent;
  let fixture: ComponentFixture<PostCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCarrouselComponent ],
      imports: [
        CarouselModule,
        BrowserAnimationsModule,
        PipesModule
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PostCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await loadDefer(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the carrousel', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const item = element.querySelector(".item");
    expect(item).toBeDefined();
  });
});
