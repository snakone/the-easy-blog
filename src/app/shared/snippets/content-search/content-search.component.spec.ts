import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ContentSearchComponent } from './content-search.component';
import { DestroyRef } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { appReducers } from '@core/ngrx/ngrx.index';
import { StoreModule } from '@ngrx/store';
import { KEYUP_EVENT } from '@shared/data/constants';
import { DraftStatusEnum, SearchTypeEnum } from '@shared/types/types.enums';

describe('ContentSearchComponent', () => {
  let component: ContentSearchComponent;
  let fixture: ComponentFixture<ContentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSearchComponent ],
      imports: [
        StoreModule.forRoot(appReducers),
      ],
      providers: [
        PostsFacade,
        DestroyRef,
        UsersFacade
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to input change', fakeAsync(() => {
    spyOn(component, 'createFilter');
    const input: HTMLInputElement = component.input.nativeElement;
    input.value = "test";
    input.dispatchEvent(new KeyboardEvent(KEYUP_EVENT));
    tick(200);
    expect(component.createFilter).toHaveBeenCalledWith(input.value); 
  }));

  it('should use User filter when {type} is Friends', fakeAsync(() => {
    spyOn(component, 'userFilter');
    component.type = SearchTypeEnum.FRIENDS;
    const input: HTMLInputElement = component.input.nativeElement;
    input.value = "user";
    input.dispatchEvent(new KeyboardEvent(KEYUP_EVENT));
    tick(200);
    expect(component.userFilter).toHaveBeenCalledWith(input.value); 
  }));

  it('should create a Post filter object and convert the status', () => {
    component.type = SearchTypeEnum.POST;
    const value = "visto";
    const filter = component.postFilter(value);
    fixture.detectChanges();
    expect(filter).toEqual({
      type: SearchTypeEnum.POST, 
      title: value, 
      category: value, 
      author: value, 
      status: DraftStatusEnum.SEEN
    });
  });

});
