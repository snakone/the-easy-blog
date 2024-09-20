import { Component } from '@angular/core';

const overlapIndexTime = 800;
const intervalTime = 5000;
const itemWidth = 228;

@Component({
  selector: 'app-text-slider',
  templateUrl: './text-slider.component.html',
  styleUrls: ['./text-slider.component.scss']
})

export class TextSliderComponent {

  index = 0;
  transitionTime = 400;
  slider: HTMLElement | undefined | null;
  timeouts: NodeJS.Timer[] = [];
  interval = this.createInterval();

  items: string[] = [
    'The Latest For Your New Post',
    'The Latest New For Your',
    'The Latest New'
  ];

  constructor() { }

  ngAfterContentChecked(): void {
    this.slider = document.getElementById('slides');
  }

  /**
   * Clear all the previous Intervals.
   * Return a new Interval that slides the text.
  */
  private createInterval(): NodeJS.Timer {
    this.timeouts.forEach((out: unknown) => window.clearTimeout(out as number))
    return setInterval(() => this.slide(1), intervalTime);
  }

  /**
   * Function that perform the text to slide.
   * @param value Value to slide. 1 (right), -1 (left)
   * @param clear If **true**, clear the current Interval.
  */
  public slide(value: number, clear: boolean = false): void {
    this.updateIndex(value);
    this.updateSliderStyles();
  
    if (clear && this.interval) { 
      window.clearInterval(this.interval as unknown as number);
      this.timeouts.push(setTimeout(() => this.createInterval(), intervalTime));
    }
  }
  
  /**
   * Update the current index of the slider.
   * Check for out of bounds before setting the index.
   * @param value Value to slide. 1 (right), -1 (left)
  */
  private updateIndex(value: number): void {
    const newIndex = this.index + value;
  
    if (newIndex < 0) {
      this.set(this.items.length - 1, overlapIndexTime);
    } else if (newIndex >= this.items.length) {
      this.set(0, overlapIndexTime);
    } else {
      this.set(newIndex, this.transitionTime);
    }
  }
  
  /**
   * Updates the CSS slider styles 'transition' and 'transform'.
  */
  private updateSliderStyles(): void {
    if (this.slider) {
      const style = this.slider.style;
      style.transition = this.createTransitionStyle();
      style.transform = this.createTransformStyle();
    }
  }

  /**
   * Returns a CSS value for transition using {transitionTime}.
  */
  private createTransitionStyle(): string {
    return `all ${this.transitionTime}ms 0`;
  }

  /**
   * Returns a CSS value for transform using {index * itemWidth}.
  */
  private createTransformStyle(): string {
    return `translate3d(-${this.index * itemWidth}px, 0, 0)`;
  }

  /**
   * Set the current {index} and {transitionTime} for each Interval loop.
   * @param i Index to set.
   * @param time Transition time between slides.
  */
  private set(
    i: number,
    time: number
  ): void {
    this.index = i;
    this.transitionTime = time;
  }
  
}
