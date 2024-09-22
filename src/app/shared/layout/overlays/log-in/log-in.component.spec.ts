import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LogInDialogComponent } from './log-in.component';
import { HttpService } from '@core/services/http/http.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StorageService } from '@core/services/storage/storage.service';
import { UserService } from '@core/services/api/users.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@core/ngrx/ngrx.index';
import { FormErrorComponent } from '@shared/snippets/form-error/form-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { REMEMBER_EMAIL_KEY, USER_ID_KEY } from '@shared/data/constants';

describe('LogInDialogComponent', () => {
  let component: LogInDialogComponent;
  let fixture: ComponentFixture<LogInDialogComponent>;
  let ls: StorageService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LogInDialogComponent,
        SignUpComponent,
        SignInComponent,
        FormErrorComponent
      ],
      imports: [
        NgxWebstorageModule.forRoot(),
        MatDialogModule,
        StoreModule.forRoot(appReducers),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        HttpService,
        provideHttpClient(withInterceptorsFromDi()),
        StorageService,
        UserService,
        {
          provide: MatDialogRef, useValue: {},
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ls = TestBed.inject(StorageService);
    userService = TestBed.inject(UserService);

    ls.setKey(USER_ID_KEY, "user-id");
    ls.setKey(REMEMBER_EMAIL_KEY, true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "checkRememberEmail" if remember is {true} and {user} in Local Storage', fakeAsync(() => {
    spyOn(userService, 'getUserEmailById');
    fixture = TestBed.createComponent(LogInDialogComponent);
    component = fixture.componentInstance;
    const id = ls.get(USER_ID_KEY);
    fixture.detectChanges();
    tick(100);
    expect(userService.getUserEmailById).toHaveBeenCalledWith(id);
  }));

  it('should show <sign-in> component as default', fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement;
    const sign = element.querySelector("app-sign-in");
    expect(sign).toBeDefined();
  }));

  it('should show <sign-up> if {register} is true', fakeAsync(() => {
    component.register = true;
    fixture.detectChanges();
    tick(100);
    const element: HTMLElement = fixture.nativeElement;
    const sign = element.querySelector("app-sign-up");
    expect(sign).toBeDefined();
  }));

});
