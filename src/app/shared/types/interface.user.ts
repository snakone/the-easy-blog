import { Post } from "./interface.post";
import { AccountType, DraftSidebarSettingsEnum, UserActivityType } from "./types.enums";

// USER
export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  profile?: UserProfile;
  stats?: UserStats;
  account?: AccountType;
  avatar?: string;
}

export interface UserProfile {
  role?: string;
  bio?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface UserStats {
  friends: number;
  likes: number;
  views?: number;
}

// ACTIVITY
export interface UserActivity {
  _id: string;
  message: string;
  title: string;
  createdAt?: Date;
  type?: UserActivityType;
  admin: boolean;
  userAction?: boolean;
  route?: string;
  slug?: string;
  user?: string;
}

export interface SameIDUser {
  public: User;
  current: User;
}

export interface SearchResult {
  posts?: Post[];
  drafts?: Post[];
  users?: User[];
  friends?: User[];
}

export interface DraftSideBarSettings {
  fixed: boolean;
  state: DraftSidebarSettingsEnum;
}




