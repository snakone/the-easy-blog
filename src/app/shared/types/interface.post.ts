import { DeltaStatic } from "quill";
import { DraftCheck } from "./interface.server";
import { DraftStatus, DraftTypes } from "./types.enums";
import { KeyPair } from "./interface.app";

// POST
export interface Post {
  _id?: string; // Mongo ID
  slug?: string;
  title?: string;
  category?: PostCategory;
  message?: DeltaStatic; // Quill Delta
  author?: string;
  cover?: string; // Image
  intro?: string;
  status?: DraftStatus;
  active?: boolean; // Current Post
  headers?: PostHeader[]; // Index
  user?: string; // User ID of the Post
  check?: DraftCheck; // Draft Check to become Post
  adminSeenOnce?: boolean; // Admin saw the Post at least once since the last edit
  temporal?: boolean; // When a Post is editing but still it's not a Draft
  type?: DraftTypes;
  likes?: number;
  views?: number;
  published?: string; // When the Post was published
  createdAt?: Date;
}

export interface PostHeader {
  text: string;
  id: string;
}

export interface QuillHelpItem {
  icon: string;
  label: string;
  message: string;
}

export interface SearchResultAmount {
  icon: string;
  name: string;
  amount: number;
}

export interface UpdateDraftKeyData {
  id: string; 
  keys: KeyPair; 
  admin?: boolean;
  showDialog?: boolean;
}

export type PostCategory = 
  'Actualidad' |
  'Naturaleza' |
  'Cultura' | 
  'Ciéncia' |
  'Política' |
  'Ingeniería' |
  'Humor' |
  'Internet' |
  'Videojuegos' |
  'Filosofía' |
  'Otro';