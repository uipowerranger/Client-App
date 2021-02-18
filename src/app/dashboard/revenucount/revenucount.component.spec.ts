import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenucountComponent } from './revenucount.component';

describe('RevenucountComponent', () => {
  let component: RevenucountComponent;
  let fixture: ComponentFixture<RevenucountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenucountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenucountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
