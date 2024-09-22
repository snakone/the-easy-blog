import { 
  Component, 
  ChangeDetectionStrategy, 
  Output, 
  EventEmitter, 
  Input,
  inject
} from '@angular/core';

import { AbstractControl, FormGroup } from '@angular/forms';
import { UsersFacade } from '@store/users/users.facade';
import { LogInDialogComponent } from '../../log-in.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SignInForm } from '@shared/types/interface.form';

import { SIGN_IN_FORM } from '@shared/data/forms';
import { EMAIL_KEY, PASSWORD_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent {

  dialogRef = inject(MatDialogRef<LogInDialogComponent>);
  userFacade = inject(UsersFacade);

  @Output() register = new EventEmitter<void>();
  signInForm!: FormGroup<SignInForm>;

  /**
   * If value and {signInForm}, set the email to the Form.
  */
  @Input() set rememberEmail(value: string) {
    if (value && this.signInForm) { this.patchAndDirty(value); }
  };

  constructor() { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  /**
   * Function to create the {SIGN_IN_FORM}
  */
  private createSignInForm(): void {
    this.signInForm = SIGN_IN_FORM();
  }

  /**
   * Function to handle form submit. Sends {email} and {password}
  */
  public onSubmit(): void {
    if (this.signInForm.invalid) { return; }
    const { email, password } = this.signInForm.value;
    this.userFacade.login(email, password);
    this.dialogRef.close();
  }

  /**
   * Output to emit User wants to register.
  */
  public signUp(): void {
    this.register.emit();
  }

  public recover(): void {
    // this.dialogRef.close();
  }

  /**
   * Function to get the form control.
  */
  private getControl(name: string): AbstractControl | null {
    return this.signInForm.get(name);
  }

  /**
   * Patch the Form email control and mark as dirty.
   * @param value The value to set.
  */
  private patchAndDirty(value: string): void {
    this.signInForm.controls.email.patchValue(value);
    this.signInForm.controls.email.markAsDirty();
  }

  get email(): AbstractControl { return this.getControl(EMAIL_KEY); }
  get password(): AbstractControl { return this.getControl(PASSWORD_KEY); }

}


