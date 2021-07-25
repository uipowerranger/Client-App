import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegboxcollectionComponent } from './vegboxcollection.component';

describe('VegboxcollectionComponent', () => {
  let component: VegboxcollectionComponent;
  let fixture: ComponentFixture<VegboxcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegboxcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegboxcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
