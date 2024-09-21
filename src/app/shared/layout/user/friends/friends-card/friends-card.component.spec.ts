import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsCardComponent } from './friends-card.component';
import { MOCK_USER } from '@core/testing/mocks/user.mock';
import { Router } from '@angular/router';
import { PROFILE_ROUTE } from '@shared/data/constants';

describe('FriendsCardComponent', () => {
  let component: FriendsCardComponent;
  let fixture: ComponentFixture<FriendsCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsCardComponent]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FriendsCardComponent);
    component = fixture.componentInstance;
    component.friend = MOCK_USER;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a stats list to display on HTML', () => {
    expect(component.statsList.length).toBe(3);
  });

  it('should show User role on the HTML if it is defined', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const roleElement = element.querySelector("p");
    expect(roleElement.textContent).toBe("tester");
  });

  it('should display a HTML list for User stats', () => {
    const element: HTMLElement = fixture.nativeElement;
    const list = element.querySelector("ul");
    expect(list.children.length).toBe(component.statsList.length);
    const likes = list.querySelector(".fa-heart").parentNode;
    expect(likes.textContent.trim()).toBe(String(component.friend.stats.likes));
  });

  it('should navigate to /profile when click on the name', () => {
    const spy = spyOn(router, 'navigateByUrl');
    const id = component.friend._id;
    const element: HTMLElement = fixture.nativeElement;
    const nameElement = element.querySelector("h2");
    nameElement.dispatchEvent(new MouseEvent("click"));
    expect(spy).toHaveBeenCalledWith(PROFILE_ROUTE + '/' + id);
  });

});
