export type DraftStatus = 
  DraftStatusEnum.NOT_SEEN | 
  DraftStatusEnum.SEEN | 
  DraftStatusEnum.PENDING | 
  DraftStatusEnum.APPROVED;

export type DraftTypes = 
  DraftTypeEnum.DRAFT | 
  DraftTypeEnum.POST;

export type AccountType = 
  AccountTypeEnum.SUPER | 
  AccountTypeEnum.ADMIN | 
  AccountTypeEnum.USER | 
  AccountTypeEnum.GUEST;

export type UserActivityType = 
  UserActivityEnum.CREATE | 
  UserActivityEnum.DELETE | 
  UserActivityEnum.UPDATE;

export type SearchType = 
  SearchTypeEnum.POST | 
  SearchTypeEnum.DRAFT | 
  SearchTypeEnum.FAVORITE |
  SearchTypeEnum.FRIENDS;

export type SavingDraftType = 
  SavingTypeEnum.SAVING | 
  SavingTypeEnum.WARNING | 
  SavingTypeEnum.TEMPORAL;

export type SnackType = 
  SnackTypeEnum.SUCCESS | 
  SnackTypeEnum.INFO | 
  SnackTypeEnum.WARNING | 
  SnackTypeEnum.ERROR;

export type ValidatorType = 
  ValidatorEnum.MIN_LENGTH | 
  ValidatorEnum.MAX_LENGTH | 
  ValidatorEnum.REQUIRED | 
  ValidatorEnum.PATTERN | 
  ValidatorEnum.EMAIL | 
  ValidatorEnum.PASSWORD;

export type ThemeType =
 ThemeEnum.LIGHT |
 ThemeEnum.DARK;

export enum SavingTypeEnum {
  SAVING = 'saving',
  WARNING = 'warning',
  TEMPORAL = 'temporal'
}

export enum DraftStatusEnum {
  NOT_SEEN = 'not-seen',
  SEEN = 'seen',
  PENDING = 'pending',
  APPROVED = 'approved',
  ALL = 'all'
}

export enum DraftTypeEnum {
  DRAFT = 'draft',
  POST = 'post'
}

export enum AccountTypeEnum {
  SUPER = 'Super',
  ADMIN = 'Admin',
  USER = 'User',
  GUEST = 'Guest'
}

export enum UserActivityEnum {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update'
}

export enum SearchTypeEnum {
  POST = 'post',
  DRAFT = 'draft',
  FAVORITE = 'favorite',
  FRIENDS = 'friends'
}

export enum ValidatorEnum {
  MIN_LENGTH = 'minlength',
  MAX_LENGTH = 'maxlength',
  REQUIRED = 'required',
  PATTERN = 'pattern',
  EMAIL = 'email',
  PASSWORD = 'password'
}

export enum SnackTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum DraftSidebarSettingsEnum {
  EXPANDED = 'expanded',
  COLLAPSED = 'collapsed'
}

export enum ErrorsTypeEnum {
  CODE = 'code',
  HTTP = 'http'
}
