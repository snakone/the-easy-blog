import { CustomError } from "./class.types";
import { FormattedNew } from "./interface.app";
import { Post } from "./interface.post";
import { SearchResult, User, UserActivity } from "./interface.user";

// SERVER RESPONSES
interface ServerResponse {
  ok: boolean;
  message?: string;
  err?: any;
}

export interface PostResponse extends ServerResponse {
 posts: Post[];
 post: Post;
 page?: number;
}

export interface DraftResponse extends ServerResponse {
  drafts?: Post[];
  draft?: Post;
}

export interface UserResponse extends ServerResponse {
  user: User;
  token?: string;
  activities?: UserActivity[];
  email?: string;
}

// SERVICE WORKER
export interface SWResponse extends ServerResponse {
  updated?: boolean;
}

export interface FavoriteResponse extends ServerResponse { 
  favorites?: string[];
}

export interface FriendsResponse extends ServerResponse { 
  friends?: User[];
}

export interface NewsResponse extends ServerResponse { 
  news?: FormattedNew[];
}

export interface ActivitiesResponse extends ServerResponse { 
  activities?: UserActivity[];
}

export interface SearchResponse extends ServerResponse { 
  result?: SearchResult;
}

export interface ErrorsResponse extends ServerResponse { 
  errors?: CustomError[];
}

// CHECK
export interface DraftCheck {
  hasGoodTitle?: CheckStatus;
  hasGoodCategory?: CheckStatus;
  hasGoodCover?: CheckStatus;
  hasGoodIntro?: CheckStatus;
  hasGoodMessage?: CheckStatus;
}

export interface CheckStatus {
  ok?: boolean;
  cause?: string;
}

export interface CheckStatusList {
  name: string;
  hint: string;
  icon: string;
  prop: string;
  desc: string;
  checkProp: string;
  checkMessage: string;
  cause: string;
}
