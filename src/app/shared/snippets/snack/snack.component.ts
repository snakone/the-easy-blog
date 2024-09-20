import { 
  Component, 
  ViewChild, 
  ElementRef, 
  DestroyRef,
  inject
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { FADE_IN_LEFT_CLASS, FADE_OUT_LEFT_CLASS } from '@shared/data/constants';
import { Snack } from '@shared/types/interface.app';
import { debounceTime } from 'rxjs';

const delay = 800;

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})

export class SnackOverlayComponent {

  crafter = inject(CrafterService);
  destroyRef = inject(DestroyRef);

  @ViewChild('snack', {static: false}) el!: ElementRef<any>;
  data!: Snack | null;
  count = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.subToSnack();
  }

  /**
   * Subscribe to Crafter Snack with 100ms debounce.
  */
  public subToSnack(): void {
    this.crafter.snack$
    .pipe(
      takeUntilDestroyed(this.destroyRef), 
      debounceTime(100)
    )
     .subscribe((res: Snack) => this.handleCSS(res));
  }

  /**
   * Handler function to fire on every new Snack.
   * 
   * If no current Snack, display and return.
   * If current Snack, remove current and show next Snack.
   * @param res The Snack to shown.
  */
  private handleCSS(res: Snack): void {
    if (!this.count) {
      this.data = res;
      this.count++;
      return;
    }

    this.el?.nativeElement.classList?.remove(FADE_IN_LEFT_CLASS);
    this.el?.nativeElement.classList?.add(FADE_OUT_LEFT_CLASS);
    this.waitAndSetSnack(res);
  }

  /**
   * Wait for {delay} to clear the current Snack.
   * 
   * If no Snack message, reset the count and return.
   * Wait {delay * 2} and show the Snack.
   * @param res The Snack to shown.
  */
  private waitAndSetSnack(res: Snack): void {
    setTimeout(() => this.data = null, delay);

    if (!res.message) {
      this.count = 0;
      return;
    }

    setTimeout(() => (this.data = res, this.count++), delay * 2); 
  }

}
