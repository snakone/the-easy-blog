import { InjectionToken } from "@angular/core";
import { APP_NAME } from "@shared/data/constants";

const APP_VERSION = '0.18.0';

export interface AppConfig {
  TITLE: string;
  APP_VERSION: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: APP_NAME,
  APP_VERSION,
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');