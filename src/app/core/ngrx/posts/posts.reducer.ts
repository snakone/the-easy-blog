import { createReducer, on, Action } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { Post } from '@shared/types/interface.post';
import { DraftsState } from '../drafts/drafts.reducer';
import { FilterType } from '@shared/types/interface.app';
import { ANY_KEY, TYPE_KEY } from '@shared/data/constants';

export interface PostState {
  posts: Post[];
  postsLoaded: boolean;
  user: Post[] | null;
  userLoaded: boolean;
  slug: Post | null;
  slugLoaded: boolean;
  full: boolean;
  error: string | null;
  filter: FilterType;
  favorites: string[];
}

export const initialState: PostState = {
  posts: null,
  postsLoaded: false,
  user: null,
  userLoaded: false,
  slug: null,
  slugLoaded: false,
  full: false,
  error: null,
  filter: {title: '', type: null},
  favorites: []
};

const featureReducer = createReducer(
  initialState,
  // GET POSTS
  on(PostActions.getSuccess, (state, { posts }) => (
    {
      ...state,
      postsLoaded: true,
      posts: state.posts ? [...state.posts, ...posts] : posts,
      error: null,
      full: completed(posts)
    }
  )),
  on(PostActions.getFailure, (state, { error }) => ({...state, postsLoaded: false, error})),
  // POST BY SLUG
  on(PostActions.getBySlug, (state) => ({...state, slugLoaded: false, error: null, slug: null})),
  on(PostActions.getBySlugSuccess, (state, {post}) => ({...state, slugLoaded: true, error: null, slug: post})),
  on(PostActions.getBySlugFailure, (state, {error}) => ({...state, slugLoaded: false, error, slug: null})),
  // POSTS BY USER
  on(PostActions.getByUserSuccess, (state, {posts}) => (
    {
      ...state,
      userLoaded: true,
      error: null,
      user: posts
  })),
  // RESET
  on(PostActions.reset, (state) => (
    {
      ...state,
      postsLoaded: false,
      error: null,
      posts: null,
      full: false,
      userLoaded: false,
      user: []
    }
  )),
  on(PostActions.resetSlug, (state) => (
    {
      ...state,
      slugLoaded: false,
      error: null,
      slug: null
    }
  )),
  on(PostActions.resetByUser, (state) => (
    {...state, userLoaded: false, error: null, user: []}
  )),
  // FILTERS
  on(PostActions.setFilter, (state, { value }) => (
    {...state, filter: { ...state.filter, ...value }}
  )),
  on(PostActions.resetFilter, (state) => (
    {...state, filter: { ...initialState.filter }}
  )),
  // FAVORITES
  on(PostActions.addFavorite, (state, { id }) => (
    {...state, favorites: Array.from(new Set([...state.favorites, id]))}
  )),
  on(PostActions.removeFavorite, (state, { id }) => (
    {...state, favorites: [...state.favorites].filter(fav => fav !== id)}
  )),
  on(PostActions.setFavorite, (state, { favorites }) => (
    {...state, favorites }
  )),
  on(PostActions.resetFavorite, (state) => (
    {...state, favorites: [] }
  )),
);

export function reducer(state: PostState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getPosts = (state: PostState) => state.posts;
export const getPostsLoaded = (state: PostState) => state.postsLoaded;
export const getByUser = (state: PostState) => state.user;
export const getByUserLoaded = (state: PostState) => state.userLoaded;
export const getFull = (state: PostState) => state.full;
export const getSlug = (state: PostState) => state.slug;
export const getFavoritesID = (state: PostState) => state.favorites;

function completed(posts: Post[]): boolean {
  return posts?.length === 0;
}

export const getFiltered = (statePost: PostState, stateDraft: DraftsState) => filterAll(statePost, stateDraft);

export const getFavorites = (
  statePost: PostState, 
  stateDraft: DraftsState
) => getFiltered(statePost, stateDraft)
      .filter((post: Post) => statePost?.favorites.includes(post?._id));

const switchObj = {
  draft: (_: PostState, stateDraft: DraftsState) => stateDraft.drafts,
  post: (statePost: PostState, _: DraftsState) => statePost.user,
  favorite: (statePost: PostState, stateDraft: DraftsState) => getFavorites(statePost, stateDraft),
  any: (
    statePost: PostState, 
    stateDraft: DraftsState
  ) => !statePost.user || 
        !stateDraft.drafts ? [] : 
        [...statePost.user, ...stateDraft.drafts?.filter(d => !d.temporal)],
};

const filterAll = (statePost: PostState, stateDraft: DraftsState) => {
  return switchObj[statePost.filter.type || ANY_KEY](statePost, stateDraft)
    .filter((post) => 
      Object.entries(statePost.filter)
      .filter(([key, _]) => key !== TYPE_KEY)
      .some(
      ([
        key,
        value
    ]) => post[key]?.toLowerCase().includes(String(value)?.toLowerCase())
  ))
}