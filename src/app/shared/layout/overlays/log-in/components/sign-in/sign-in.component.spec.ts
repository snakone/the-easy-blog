import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appReducers } from '@core/ngrx/ngrx.index';
import { StoreModule } from '@ngrx/store';
import { FormErrorComponent } from '@shared/snippets/form-error/form-error.component';

fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignInComponent,
        FormErrorComponent
      ],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [
        UsersFacade,
        {
          provide: MatDialogRef, useValue: {},
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
