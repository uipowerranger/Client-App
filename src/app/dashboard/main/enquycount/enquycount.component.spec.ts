import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquycountComponent } from './enquycount.component';

describe('EnquycountComponent', () => {
  let component: EnquycountComponent;
  let fixture: ComponentFixture<EnquycountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquycountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquycountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
