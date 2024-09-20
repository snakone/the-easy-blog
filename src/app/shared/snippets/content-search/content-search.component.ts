import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { FilterType } from '@shared/types/interface.app';
import { KEYUP_EVENT } from '@shared/data/constants';
import { SEARCH_DEFAULT_PLACEHOLDER } from '@shared/data/data';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { SearchType, DraftStatus, DraftStatusEnum, SearchTypeEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-content-search',
  templateUrl: './content-search.component.html',
  styleUrls: ['./content-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContentSearchComponent {

  postFacade = inject(PostsFacade);
  userFacade = inject(UsersFacade);
  destroyRef = inject(DestroyRef);

  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type: SearchType;
  @Input() placeholder: string = SEARCH_DEFAULT_PLACEHOLDER;

  switchSearchStatus: {[key: string]: DraftStatus} = {
    'pendiente': DraftStatusEnum.PENDING,
    'visto': DraftStatusEnum.SEEN,
    'no visto': DraftStatusEnum.NOT_SEEN
  };

  constructor() { }

  /**
   * Subscribe to {KEYUP_EVENT} with debounceTime(100)
  */
  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.input.nativeElement, KEYUP_EVENT).
     pipe(
      map((ev: any) => ev.target?.value as string),
      debounceTime(100),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
     ).subscribe((value: string) => this.createFilter(value))
  }

  /**
   * Function to filter everything when the input value changes.
   @param value The input value.
  */
  public createFilter(value: string): void {
    switch (this.type) {
      case SearchTypeEnum.FRIENDS: {
        this.userFacade.setFilter(this.userFilter(value));
        break;
      }
      default: {
        this.postFacade.setFilter(this.postFilter(value));
      }
    }
  }

  /**
   * Returns the filter to use when searching for Post/Draft.
   @param value The input value.
  */
  public postFilter(value: string): FilterType {
    return {
      title: value,
      category: value,
      author: value,
      status: this.convertStatus(value),
      type: this.type
    };
  }
  
  /**
   * Returns the filter to use when searching for Users.
   @param value The input value.
  */
  public userFilter(value: string): FilterType {
    return {
      name: value,
      email: value,
      location: value,
      role: value,
      type: this.type
    };
  }

  /**
   * Function that normalizes the value as Post/Draft Status.
   * Used on Post filter only.
   @param value The input value.
  */
  public convertStatus(value: string): DraftStatus {
    return this.switchSearchStatus[(value || '').toLowerCase().trim()];
  }

}

