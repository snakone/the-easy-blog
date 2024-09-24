import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorsFacade } from '@core/ngrx/errors/errors.facade';
import { ERROR_PAGE_TEXT_SENTENCE } from '@shared/data/sentences';
import { CustomError } from '@shared/types/class.types';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorsComponent {

  errorsFacade = inject(ErrorsFacade);
  destroyRef = inject(DestroyRef);

  errors$: Observable<CustomError[]>;
  text = ERROR_PAGE_TEXT_SENTENCE;

  ngOnInit() {
    this.checkData();
    this.errors$ = this.errorsFacade.errors$;
  }

  private checkData(): void {
    this.errorsFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.errorsFacade.get());
  }

}
