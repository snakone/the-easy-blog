import { props, createAction } from '@ngrx/store';
import { KeyPair, SavingType, FilterType } from '@shared/types/interface.app';
import { Post, UpdateDraftKeyData } from '@shared/types/interface.post';

// GET DRAFTS BY SLUG
export const getBySlug =
  createAction('[Drafts API] Get Draft by Slug',
  props<{ slug: string }>());

export const getBySlugSuccess =
  createAction('[Drafts API] Get Drafts by Slug Success',
  props<{ draft: Post }>());

export const getBySlugFailure =
  createAction('[Drafts API] Get Draft by Slug Failure',
  props<{ error: string }>());

// GET DRAFTS BY USER
export const getByUser =
  createAction('[Drafts API] Get Drafts by User');

export const getByUserSuccess =
  createAction('[Drafts API] Get Drafts by User Success',
  props<{ drafts: Post[] }>());

export const getByUserFailure =
  createAction('[Drafts API] Get Draft by User Failure',
  props<{ error: string }>());

// GET ALL DRAFTS
export const getAll =
  createAction('[Drafts API] Get All Drafts');

export const getAllSuccess =
  createAction('[Drafts API] Get All Drafts Success',
  props<{ drafts: Post[] }>());

export const getAllFailure =
  createAction('[Drafts API] Get All Drafts Failure',
  props<{ error: string }>());

// CREATE DRAFT
export const create =
  createAction('[Drafts API] Create Draft',
  props<{ draft: Post }>());

export const createSuccess =
  createAction('[Drafts API] Create Draft Success',
  props<{ draft: Post }>());

export const createFailure =
  createAction('[Drafts API] Create Draft Failure',
  props<{ error: string }>());

// UPDATE DRAFT
export const update =
  createAction('[Drafts API] Update Draft',
  props<{ draft: Post, admin?: boolean }>());

export const updateSuccess =
  createAction('[Drafts API] Update Draft Success',
  props<{ draft: Post, admin?: boolean }>());

export const updateFailure =
  createAction('[Drafts API] Update Draft Failure',
  props<{ error: string }>());

// UPDATE DRAFT KEY
export const updateKey =
  createAction('[Drafts API] Update Draft Key',
  props<{ data: UpdateDraftKeyData }>());

export const updateKeySuccess =
  createAction('[Drafts API] Update Draft Key Success',
  props<{ draft: Post, admin?: boolean }>());

export const updateKeyFailure =
  createAction('[Drafts API] Update Draft Key Failure',
  props<{ error: string }>());

// DELETE DRAFT
export const deleteDraft =
  createAction('[Drafts API] Delete Draft',
  props<{ id: string, reload?: boolean }>());

export const deleteSuccess =
  createAction('[Drafts API] Delete Draft Success',
  props<{ id: string, reload?: boolean }>());

export const deleteFailure =
  createAction('[Drafts API] Delete Draft Failure',
  props<{ error: string }>());

// SET ACTIVE
export const setActive =
  createAction('[Drafts API] Set Active Draft',
  props<{ draft: Post }>());

// SET BY SLUG
export const setBySlug =
  createAction('[Drafts API] Set Draft by Slug',
  props<{ draft: Post }>());

// SET PREVIEW
export const setPreview =
  createAction('[Drafts API] Set Draft Preview',
  props<{ draft: Post }>());

// SET SAVING
export const setSaving =
  createAction('[Drafts API] Set Draft Saving',
  props<{ data: SavingType }>());

// ACTIVE OFF
export const resetActive =
  createAction('[Drafts API] Set Active Off Draft');

// RESET DRAFTS
export const reset =
  createAction('[Drafts API] Reset Drafts',
  props<{ draft?: Post }>());

export const resetSlug =
  createAction('[Drafts API] Reset Draft Slug');

// RESET SAVING
export const resetSaving =
  createAction('[Drafts API] Reset Draft Saving');

// RESET SAVING
export const resetPreview =
  createAction('[Drafts API] Reset Draft Preview');

// SET FILTER
export const setFilter =
  createAction('[Drafts API] Set Filter',
  props<{ value: FilterType }>());

export const resetFilter =
  createAction('[Drafts API] Reset Filter');

// PUBLISH DRAFT
export const publish =
  createAction('[Drafts API] Publish Draft',
  props<{ draft: Post }>());

export const publishSuccess =
  createAction('[Drafts API] Publish Draft Success',
  props<{ draft: Post }>());

export const publishFailure =
  createAction('[Drafts API] Publish Draft Failure',
  props<{ error: string }>());

// ADD TEMPORAL
export const addTemporal =
  createAction('[Drafts API] Add Temporal Post to Drafts',
  props<{ post: Post }>());

export const removeTemporal =
  createAction('[Drafts API] Remove Temporal Post to Drafts',
  props<{ post: Post }>());

// FIND ACTIVE
export const findActiveAndUpdate =
  createAction('[Drafts API] Find Active and Update');