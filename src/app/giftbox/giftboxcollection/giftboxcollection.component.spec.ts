import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftboxcollectionComponent } from './giftboxcollection.component';

describe('GiftboxcollectionComponent', () => {
  let component: GiftboxcollectionComponent;
  let fixture: ComponentFixture<GiftboxcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftboxcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftboxcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
