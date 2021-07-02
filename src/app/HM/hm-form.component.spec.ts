import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GiftBoxComponent } from './giftbox.component';

describe('GiftBoxComponent', () => {
  let component: GiftBoxComponent;
  let fixture: ComponentFixture<GiftBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GiftBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
