import { Injectable, signal, WritableSignal } from '@angular/core';
import { DeltaStatic } from 'quill';
import { Subject } from 'rxjs';

@Injectable()
export class CreateDraftService {

  onDraftDelete$ = new Subject<string>();
  onCollapse$ = new Subject<boolean>();
  onSaveManual$ = new Subject<string>();

  currentDelta: WritableSignal<DeltaStatic> = signal(null as DeltaStatic);

  constructor() { }

  public onDeleteDraft(id: string): void {
    this.onDraftDelete$.next(id);
  }

  public onCollapse(collapse: boolean): void {
    this.onCollapse$.next(collapse);
  }

  public onSaveManual(id?: string): void {
    this.onSaveManual$.next(id);
  }
}
