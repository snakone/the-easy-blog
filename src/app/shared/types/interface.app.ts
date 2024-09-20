import { ComponentType } from "@angular/cdk/portal";
import { Post } from "./interface.post";
import { DraftStatusEnum, SavingDraftType, SearchType, SnackType } from "./types.enums";

export interface PostHeader {
  text: string;
  id: string;
}

export interface Snack {
  message: string | null;
  type?: SnackType;
}

// LIST
export interface IconList {
  icon?: string;
  label?: string;
  route?: string;
  _id?: number;
}

export interface TextList {
  label: string;
  key: string;
}

export interface ActionList {
  icon: string;
  label: string;
  action: string;
}

export interface NotificationPayload {
  title?: string;
  body: string;
  icon?: string;
  vibrate?: number[];
  requireInteraction?: boolean;
  image?: string;
  data?: NotificationData;
  actions: NotificationAction[];
  user?: string;
  broadcast?: boolean;
  device?: string | RegExp;
  admin?: boolean;
}

interface NotificationData {
  url?: string;
  data?: any;
}

interface NotificationAction {
  action: string;
  title: string;
}

export interface KeyPair {
  key: string;
  value: any;
}

export interface SavingType {
  type: SavingDraftType;
  value: boolean;
}

export interface FilterType {
  [key: string]: string | number | boolean;
  type?: SearchType;
}

export interface StatusButtons {
  status: DraftStatusEnum;
  active: boolean;
}

export interface DraftPreviewDialogData {
  updateStatus?: boolean;
  draft?: Post;
}

export interface ConfirmationDialogProps {
  title: string;
  message: string;
}

export interface FQAItem {
  label: string;
  content: string[];
}

export interface FormattedNew {
  author?: string;
  title?: string;
  description?: string;
  category?: string;
  url?: string;
  image?: string;
  published_at: Date;
}

export interface FormattedDialog<T> {
  component: ComponentType<T>,
  data?: any,
  id?: string,
  css?: string
}

