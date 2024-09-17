import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StorageService } from '@core/services/storage/storage.service';
import { HttpService } from '@core/services/http/http.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from '@shared/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { AUTO_LOGIN_KEY, THEME_KEY, TOKEN_KEY } from '@shared/data/constants';
import { ThemeEnum } from '@shared/types/types.enums';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersFacade } from '@core/ngrx/users/users.facade';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  let ls: StorageService;
  let store: MockStore;
  const initialState = { user: null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        LayoutModule,
        BrowserModule,
        StoreModule.forRoot({}),
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        StorageService,
        HttpService,
        provideHttpClient(withInterceptorsFromDi()),
        // provideMockStore({ initialState }),
        UsersFacade
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    ls = TestBed.inject(StorageService);
    ls.setKeySettings(AUTO_LOGIN_KEY, true);
    ls.setKeySettings(THEME_KEY, ThemeEnum.DARK);
    ls.setKey(TOKEN_KEY, 'test-token');
    // store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it('should check for theme on StorageService', () => {
    const theme = ls.getSettings(THEME_KEY);
    expect(theme).toBe(ThemeEnum.DARK);
  });

  it('should have class "dark" on document body', () => {
    spyOn(comp, 'checkTheme');
    comp.checkTheme();
    expect(comp.checkTheme).toHaveBeenCalled();
    expect(document.body.className).toBe(ThemeEnum.DARK);
  }, 1000);
 
  it('should check for User Token if values on Storage Service are correct', () => {
    const autoLogin = ls.getSettings(AUTO_LOGIN_KEY);
    const token = ls.get(TOKEN_KEY);
    spyOn(comp, 'checkToken');
    spyOn(comp.userFacade, 'verifyToken');
    comp.checkToken();
    expect(comp.checkToken).toHaveBeenCalled();
    expect(autoLogin).toBeTrue();
    expect(token).toBe('test-token');
    // expect(comp.userFacade.verifyToken).toHaveBeenCalled();
  }); 

});
