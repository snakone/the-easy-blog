import { AppState } from "@core/ngrx/ngrx.index";

export const MOCK_APP_STATE: AppState = {
  posts: {
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
  },
  search: {
    value: '',
    result: null,
    loaded: false
  },
  user: {
    user: null,
    email: null,
    error: null,
    loaded: false,
    friends: [],
    public: null,
    filter: {name: '', type: null},
  }
}