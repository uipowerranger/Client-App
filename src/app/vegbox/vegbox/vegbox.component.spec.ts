import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegboxComponent } from './vegbox.component';

describe('VegboxComponent', () => {
  let component: VegboxComponent;
  let fixture: ComponentFixture<VegboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
