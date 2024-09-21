import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ConfirmationDialogComponent } from '@layout/overlays/confirmation/confirmation.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogProps, FormattedDialog, Snack } from '@shared/types/interface.app';
import { SnackType, SnackTypeEnum } from '@shared/types/types.enums';

@Injectable({providedIn: 'root'})

export class CrafterService {

  snack$: Subject<Snack> = new Subject<Snack>();
  time!: NodeJS.Timeout;
  alreadySnack: boolean;

  constructor(
    private matDialog: MatDialog
  ) { }

  public dialog<T>({...args}: FormattedDialog<T>): MatDialogRef<T> {
    return this.matDialog.open(args.component, {
      data: args.data, id: args.id || '', panelClass: args.css,
      enterAnimationDuration: 0,
      exitAnimationDuration: 0
    });
  }

  public setSnack(
    message: string | null,
    type: SnackType = SnackTypeEnum.INFO,
    duration: number = 3000
  ): void {
    if (this.alreadySnack) { return; }
    setTimeout(() => {
      this.snack$.next({message, type});
      this.alreadySnack = true;
      this.removeSnack(duration);
    }, this.time ? duration : 0);
  }

  private removeSnack(duration: number): void {
    this.time = setTimeout(() => {
      this.snack$.next({message: null});
      this.clearSnack();
      this.alreadySnack = false;
    }, duration);
  }

  private clearSnack(): void {
    clearTimeout(this.time);
    this.time = null;
  }

  public confirmation(
    { title, message }: ConfirmationDialogProps
  ): MatDialogRef<ConfirmationDialogComponent> {
    return this.matDialog.open(ConfirmationDialogComponent, {
      data: { title, message },
      enterAnimationDuration: 0,
      exitAnimationDuration: 0
    })
  }

}


