import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscountComponent } from './userscount.component';

describe('UserscountComponent', () => {
  let component: UserscountComponent;
  let fixture: ComponentFixture<UserscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
