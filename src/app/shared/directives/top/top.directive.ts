import { Directive, ElementRef, DestroyRef } from '@angular/core';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { SCROLL_EVENT } from '@shared/data/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const limit = 800;
const addClass = 'fadeInRight';
const outClass = 'fadeOutRight'

@Directive({selector: '[TopDirective]'})

export class TopDirective {

  displayed = false;
  button = this.el.nativeElement;  // Button

  constructor(private el: ElementRef, private destroyRef: DestroyRef) { }

  ngAfterViewInit(): void {
    this.listenScroll();
  }

  private listenScroll(): void {
    fromEvent(window, SCROLL_EVENT)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        throttleTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.onScroll());
  }

  private onScroll(): void {
    try {
      const scroll = window.scrollY || document.documentElement.scrollTop || 0;
      if ((scroll > limit && this.displayed) || (scroll < limit && !this.displayed)) {
        return;
      }
      this.manageCSS(scroll > limit);
    } catch (err) {
      console.error(err);
    }
  }

  private manageCSS(scrolled: boolean): void {
    if (scrolled) {
        this.button.style.display = 'block';
        this.displayed = true;
        this.button.classList.remove(outClass);
        this.button.classList.add(addClass);
    } else { 
        this.displayed = false;
        this.button.classList.remove(addClass);
        this.button.classList.add(outClass);
    }
  }

}