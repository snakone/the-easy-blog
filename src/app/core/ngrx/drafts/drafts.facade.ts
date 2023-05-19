import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterType, KeyPair, Post, SavingType } from '@shared/types/interface.types';

import * as DraftActions from './drafts.actions';
import { DraftsState } from './drafts.reducer';
import * as fromDrafts from './drafts.selectors';

@Injectable({providedIn: 'root'})

export class DraftsFacade {

  drafts$ = this.store.select(fromDrafts.get);
  loaded$ = this.store.select(fromDrafts.getLoaded);
  all$ = this.store.select(fromDrafts.getAll);
  allLoaded$ = this.store.select(fromDrafts.getAllLoaded);
  active$ = this.store.select(fromDrafts.getActive);
  bySlug$ = this.store.select(fromDrafts.getBySlug);
  bySlugLoaded$ = this.store.select(fromDrafts.getBySlugLoaded);
  saving$ = this.store.select(fromDrafts.getSaving);
  preview$ = this.store.select(fromDrafts.getPreview);
  byID$ = (id: string) => this.store.select(fromDrafts.getById(id));

  constructor(private store: Store<DraftsState>) { }

  public get(): void {
    this.store.dispatch(DraftActions.getByUser());
  }

  public getAll(): void {
    this.store.dispatch(DraftActions.getAll());
  }

  public getBySlug(slug: string): void {
    this.store.dispatch(DraftActions.getBySlug({slug}));
  }

  public create(draft: Post): void {
    this.store.dispatch(DraftActions.create({draft}));
  }

  public publish(draft: Post): void {
    this.store.dispatch(DraftActions.publish({draft}));
  }

  public update(draft: Post): void {
    this.store.dispatch(DraftActions.update({draft}));
  }

  public updateKey(id: string, keys: KeyPair, toast?: boolean): void {
    this.store.dispatch(DraftActions.updateKey({id, keys, toast}));
  }

  public delete(id: string): void {
    this.store.dispatch(DraftActions.deleteDraft({id}));
  }

  public setActive(draft: Post): void {
    this.store.dispatch(DraftActions.setActive({draft}));
  }

  public setPreview(draft: Post): void {
    this.store.dispatch(DraftActions.setPreview({draft}));
  }

  public setSaving(data: SavingType): void {
    this.store.dispatch(DraftActions.setSaving({data}));
  }

  public resetSaving(): void {
    this.store.dispatch(DraftActions.resetSaving());
  }

  public resetActive(): void {
    this.store.dispatch(DraftActions.resetActive());
  }

  public reset(): void {
    this.store.dispatch(DraftActions.reset(null));
  }

  public resetPreview(): void {
    this.store.dispatch(DraftActions.resetPreview());
  }

  public resetBySlug(): void {
    this.store.dispatch(DraftActions.resetSlug());
  }

  public addTemporal(post: Post): void {
    this.store.dispatch(DraftActions.addTemporal({post}));
  }

  public removeTemporal(post: Post): void {
    this.store.dispatch(DraftActions.removeTemporal({post}));
  }

}