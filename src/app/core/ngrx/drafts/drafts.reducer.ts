import { createReducer, on, Action } from '@ngrx/store';
import * as DraftActions from './drafts.actions';
import { Post } from '@shared/types/interface.post';
import { SavingType } from '@shared/types/interface.app';

export interface DraftsState {
  drafts: Post[];
  loaded: boolean;
  all: Post[];
  allLoaded: boolean;
  active: Post;
  preview: Post;
  saving: SavingType;
  error: string | null;
  temporal: Post[];
  bySlug: Post;
  bySlugLoaded: boolean;
}

export const initialState: DraftsState = {
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

const featureReducer = createReducer(
  initialState,
  // GET DRAFTS BY USER
  on(DraftActions.getByUserSuccess, (state, { drafts }) => {
    if (state.temporal.length > 0) {
      drafts.unshift(...state.temporal);
    }
    return (
      {
        ...state,
        loaded: true,
        drafts: [...drafts].map(d => d._id === state.active?._id ? (d.active = true, d) : d),
        error: null
      }
    )
  }),
  on(DraftActions.getByUserFailure, (state, { error }) => ({ ...state, error, loaded: false })),
  // GET ALL DRAFTS
  on(DraftActions.getAllSuccess, (state, { drafts }) => (
    {
      ...state,
      allLoaded: true,
      all: [...drafts],
      error: null
    }
  )),
  on(DraftActions.getAllFailure, (state, { error }) => ({ ...state, error, allLoaded: false })),
  // DRAFT BY SLUG
  on(DraftActions.setBySlug, (state, {draft}) => ({...state, bySlug: draft, bySlugLoaded: true})),
  on(DraftActions.getBySlug, (state) => ({...state, bySlug: null, bySlugLoaded: false})),
  on(DraftActions.getBySlugSuccess, (state, {draft}) => ({...state, bySlug: draft, bySlugLoaded: true})),
  on(DraftActions.getBySlugFailure, (state, {error}) => ({...state, bySlug: null, error, loaded: false, bySlugLoaded: false})),
  // CREATE DRAFT
  on(DraftActions.createSuccess, (state, { draft }) => (
    {
      ...state,
      drafts: [draft, ...state.drafts],
      active: (draft.active = true, draft)
    }
  )),
  on(DraftActions.createFailure, (state, { error }) => ({ ...state, error })),
  // DELETE DRAFT
  on(DraftActions.deleteSuccess, (state, { id }) => (
    {
      ...state,
      drafts: [...state.drafts].filter(d => d._id !== id),
      active: null
    }
  )),
  // SET ACTIVE
  on(DraftActions.setActive, (state, { draft }) => (
    {
      ...state,
      drafts: [...state.drafts].map(d => (d.active = false, d)),
      active: (draft.active = true, draft),
      preview: draft
    }
  )),
  on(DraftActions.setPreview, (state, { draft }) => ({ ...state, preview: draft})),
  on(DraftActions.resetActive, (state) => (
    {
      ...state,
      active: null,
      drafts: [...state.drafts.map(d => (d.active = false, d))]
    })),
  on(DraftActions.setSaving, (state, { data }) => {
    return ({ ...state, saving: data})}),
  // RESET
  on(DraftActions.reset, (state, {draft}) => {

    if (draft) {
      state.temporal = state.temporal.filter(t => t._id !== draft._id);
    }
    
    return (
    {
      ...state,
      loaded: false,
      error: null,
      drafts: [],
      allLoaded: false,
      all: []
    }
  )}),
  on(DraftActions.resetSaving, (state) => ({ ...state, saving: null })),
  on(DraftActions.resetSlug, (state) => ({ ...state, bySlug: null, bySlugLoaded: false })),
  on(DraftActions.resetPreview, (state) => ({ ...state, preview: null })),
  // PUBLISH
  on(DraftActions.publishFailure, (state, {error}) => ({ ...state, error })),
  // TEMPORAL
  on(DraftActions.addTemporal, (state, {post}) => {
    if (state.temporal.find(t => t._id === post._id)) {
      return ({...state});
    }
    return (
    { 
      ...state,
      temporal: [...state.temporal, post],
      drafts: [post, ...state.drafts] 
    }
  )}),
  on(DraftActions.removeTemporal, (state, {post}) => (
    { 
      ...state, 
      drafts: [...state.drafts.filter(d => !d.temporal || d._id !== post?._id)],
      temporal: [...state.temporal.filter(t => t._id !== post?._id)]
    }))
);

export function reducer(state: DraftsState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getDrafts = (state: DraftsState) => state.drafts;
export const getDraftsLoaded = (state: DraftsState) => state.loaded;
export const getAll = (state: DraftsState) => state.all;
export const getAllLoaded = (state: DraftsState) => state.allLoaded;
export const getActive = (state: DraftsState) => state.active;
export const getSaving = (state: DraftsState) => state.saving;
export const getPreview = (state: DraftsState) => state.preview;
export const getBySlug = (state: DraftsState) => state.bySlug;
export const getBySlugLoaded = (state: DraftsState) => state.bySlugLoaded;

