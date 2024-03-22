import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessNavBarComponent } from './user-access-nav-bar.component';

describe('UserAccessNavBarComponent', () => {
  let component: UserAccessNavBarComponent;
  let fixture: ComponentFixture<UserAccessNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccessNavBarComponent]
    });
    fixture = TestBed.createComponent(UserAccessNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
