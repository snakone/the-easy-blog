import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { QuillToolbarComponent } from './quill-toolbar.component';
import { StorageService } from '@core/services/storage/storage.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { RouterModule } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { StoreModule } from '@ngrx/store';
import { QuillService } from '@core/services/quill/quill.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { appReducers } from '@core/ngrx/ngrx.index';
import { createMockStore, MockStore } from '@ngrx/store/testing';
import * as fromDrafts from '@store/drafts/drafts.selectors';
import { DraftService } from '@core/services/api/drafts.service';
import { DraftsAccessModule } from '@core/ngrx/drafts/data-access/drafts-access.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpService } from '@core/services/http/http.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DraftsState } from '@core/ngrx/drafts/drafts.reducer';
import { SavingTypeEnum } from '@shared/types/types.enums';
import { AUTO_SAVE_KEY } from '@shared/data/constants';
import { filter, firstValueFrom } from 'rxjs';
import { DELETE_CONFIRMATION, PREVIEW_DRAFT_DIALOG, QUILL_HELP_DIALOG, SAVE_CONFIRMATION } from '@shared/data/dialogs';

describe('QuillToolbarComponent', () => {
  let component: QuillToolbarComponent;
  let fixture: ComponentFixture<QuillToolbarComponent>;
  let store: MockStore;
  let ls: StorageService;
  let crafter: CrafterService;
  let draftsFacade: DraftsFacade;
  let quillService: QuillService;
  let createDraftService: CreateDraftService;

  let initialState: DraftsState = {
    drafts: [],
    loaded: false,
    all: null,
    allLoaded: false,
    active: null,
    preview: null,
    saving: null,
    error: null,
    temporal: [],
    bySlug: null,
    bySlugLoaded: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuillToolbarComponent ],
      imports: [
        MatTooltipModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(appReducers),
        NgxWebstorageModule.forRoot(),
        EffectsModule.forRoot({}),
        DraftsAccessModule,
      ],
      providers: [
        StorageService,
        CrafterService,
        DraftsFacade,
        QuillService,
        CreateDraftService,
        DestroyRef,
        DraftService,
        HttpService,
        provideHttpClient(withInterceptorsFromDi()),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ls = TestBed.inject(StorageService);
    crafter = TestBed.inject(CrafterService);
    draftsFacade = TestBed.inject(DraftsFacade);
    quillService = TestBed.inject(QuillService);
    createDraftService = TestBed.inject(CreateDraftService);
    component.draft = {_id: 'test-id', title: "test"};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get total drafts from Store', async () => {
    store = createMockStore({ initialState, selectors: [
      { selector: fromDrafts.get, value: [{title: "test1"}, {title: "test2"}] },
      { selector: fromDrafts.getSaving, value: null }
    ]});

    const totalDrafts = await firstValueFrom(component.totalDrafts$);
    expect(totalDrafts).toBe(2);
  });

  it('should set saving$ to false if no "autoSave" on Local Storage', () => {
    spyOn(component, 'checkAutoSave');
    ls.setKeySettings(AUTO_SAVE_KEY, false);
    component.checkAutoSave();
    component.saving$.pipe(filter(res => Boolean(res))).subscribe(saving => {
      expect(saving).toEqual({value: false, type: SavingTypeEnum.TEMPORAL}); 
    });
    expect(component.checkAutoSave).toHaveBeenCalled();
  });

  it('should show confirmation dialog when click on "save"', fakeAsync(() => {
    spyOn(crafter, 'confirmation');
    const element: HTMLElement = fixture.nativeElement;
    const saveButton = element.querySelector(".fa-plus");
    saveButton.dispatchEvent(new MouseEvent('click'));
    tick(200);
    expect(crafter.confirmation).toHaveBeenCalledWith(SAVE_CONFIRMATION);
  }));

  it('should show preview dialog when click on "preview"', fakeAsync(() => {
    spyOn(crafter, 'dialog');
    const element: HTMLElement = fixture.nativeElement;
    const previewButton = element.querySelector(".fa-eye");
    previewButton.dispatchEvent(new MouseEvent('click'));
    tick(200);
    expect(crafter.dialog).toHaveBeenCalledWith(PREVIEW_DRAFT_DIALOG);
  }));

  it('should show help dialog when click on "help"', fakeAsync(() => {
    spyOn(crafter, 'dialog');
    const element: HTMLElement = fixture.nativeElement;
    const helpButton = element.querySelector(".fa-question-circle");
    helpButton.dispatchEvent(new MouseEvent('click'));
    tick(200);
    expect(crafter.dialog).toHaveBeenCalledWith(QUILL_HELP_DIALOG);
  }));

  it('should set disabled on icons when saving is true', fakeAsync(() => {
    draftsFacade.setSaving({value: true, type: SavingTypeEnum.SAVING});
    fixture.detectChanges();
    spyOn(crafter, 'dialog');
    const element: HTMLElement = fixture.nativeElement;
    const helpButton = element.querySelector(".fa-plus");
    expect(helpButton.classList).toContain("disabled");
  }));

  it('should call the {quillSrv.convertToHTML} to download the current {draft}', fakeAsync(() => {
    spyOn(quillService, 'convertToHTML');
    const element: HTMLElement = fixture.nativeElement;
    const downloadButton = element.querySelector(".fa-cloud-download-alt");
    downloadButton.dispatchEvent(new MouseEvent('click'));
    tick(200);
    expect(quillService.convertToHTML).toHaveBeenCalledWith(component.draft);
  }));

  it('should show manual save button when {saving} is "temporal"', fakeAsync(async() => {
    spyOn(createDraftService, 'onSaveManual');
    draftsFacade.setSaving({value: false, type: SavingTypeEnum.TEMPORAL});
    fixture.detectChanges();
    component.saving$.pipe(filter(res => Boolean(res))).subscribe(_ => {
      const element: HTMLElement = fixture.nativeElement;
      const temporalIcon = element.querySelector(".temporal .fa-exclamation-triangle");
      const saveManualButton = element.querySelector(".temporal .fa-save");
      saveManualButton.dispatchEvent(new MouseEvent('click'));
      expect(temporalIcon.getAttribute("ng-reflect-message")).toBe("Guardado manual");
      expect(createDraftService.onSaveManual).toHaveBeenCalledWith(component.draft._id);
    });
  }));

  it('should show confirmation dialog when click on "delete"', fakeAsync(() => {
    spyOn(crafter, 'confirmation');
    const element: HTMLElement = fixture.nativeElement;
    const helpButton = element.querySelector(" .fa-trash-alt");
    helpButton.dispatchEvent(new MouseEvent('click'));
    tick(200);
    expect(crafter.confirmation).toHaveBeenCalledWith(DELETE_CONFIRMATION);
  }));

});
