import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from '@shared/types/interface.user';
import { LOCATION_KEY, ROLE_KEY, TYPE_KEY } from '@shared/data/constants';
import { FilterType } from '@shared/types/interface.app';

export interface UserState {
  user: User | null;
  email: string | null;
  error: string | null;
  loaded: boolean;
  friends: User[];
  public: User;
  filter: FilterType;
}

export const initialState: UserState = {
  user: null,
  email: null,
  error: null,
  loaded: false,
  friends: [],
  public: null,
  filter: {name: '', type: null},
};

const featureReducer = createReducer(
  initialState,
  // LOGIN USER
  on(UserActions.loginSuccess, (state, { user }) => ({...state, error: null, user, loaded: true })),
  on(UserActions.updateSuccess, (state, { user }) => ({...state, user })),
  on(UserActions.loginFailure, (state, { error }) => ({ ...state, loaded: false, error })),
  // USER LOG OUT
  on(UserActions.userLogOut, (state) => ({ ...state, error: null, user: null, loaded: false })),
  // FRIENDS
  on(UserActions.addFriend, (state, { friend }) => {
    const unique = state.friends?.length === 0 ? [friend] : state.friends.reduce((curr, acc) => {
      const exist = curr.find(friend => friend._id === acc._id);
      if (!exist) { curr = [...curr, friend]; }
      return curr;
    }, [] as User[]);
    return (
      {
        ...state, 
        friends: unique
      }
  )}),
  on(UserActions.removeFriend, (state, { id }) => (
    {...state, friends: [...state.friends].filter(frd => frd._id !== id)}
  )),
  on(UserActions.setFriends, (state, { friends }) => (
    {...state, friends }
  )),
  on(UserActions.resetFriends, (state) => (
    {...state, friends: [] }
  )),
  // PUBLIC
  on(UserActions.setPublic, (state, { user }) => (
    {...state, public: user }
  )),
  // FILTERS
  on(UserActions.setFilter, (state, { value }) => (
    {...state, filter: { ...state.filter, ...value }}
  )),
  on(UserActions.resetFilter, (state) => (
    {...state, filter: { ...initialState.filter }}
  )),
);

export function reducer(state: UserState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getUser = (state: UserState) => state.user;
export const getFriends = (state: UserState) => state.friends;
export const getPublic = (state: UserState) => state.public;
export const getUserFilter = (state: UserState) => state.filter;

export const getFriendsFiltered = (stateUser: UserState) => filterFriends(stateUser);

const filterFriends = (stateUser: UserState) => {
  const { filter, friends } = stateUser;
  return friends.filter((friend) => 
      Object.entries(filter)
       .filter(([key]) => key !== TYPE_KEY)
       .some(([key, value]) => {
        const input = key === LOCATION_KEY || key === ROLE_KEY
          ? friend.profile?.[key]
          : friend[key];
        return input
          ? input.toLowerCase().includes(String(value)?.toLowerCase())
        : false;
    })
  )
}
