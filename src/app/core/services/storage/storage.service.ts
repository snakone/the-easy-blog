import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { STORAGE_CONSTANTS, Storage } from './storage.config';
import { UserSettings } from '@shared/types/class.types';

@Injectable()

export class StorageService {

  @LocalStorage(STORAGE_CONSTANTS.KEY)
  public storage!: Storage;

  constructor() {
    setTimeout(()=> this.loadStorage(), 1000)
  }

  public setKey(key: string, value: any): void {
    this.loadStorage();
    if (value === undefined) { return; }
    this.storage[key] = value;
    this.storage = this.storage;
  }

  public setKeySettings(key: string, value: any): void {
    this.loadStorage();
    if (value === undefined) { return; }
    this.storage.settings[key] = value;
    this.storage = this.storage;
  }

  public setSettings(settings: UserSettings): void {
    this.loadStorage();
    if (settings === undefined) { return; }
    this.storage.settings = settings;
    this.storage = this.storage;
  }

  public get(value: string): string | undefined {
    this.loadStorage();
    return this.storage[value] || undefined;
  }

  public getSettings(value?: string): StorageDataType {
    this.loadStorage();
    if (!value) {
      return this.storage.settings || undefined;
    }
    return this.storage.settings[value] || undefined;
  }

  private loadStorage(): void {
    if (!this.storage) { this.reset(); }
  }

  public reset(): void {
    this.storage = new Storage();
  }

}

type StorageDataType = string | UserSettings | boolean | undefined;