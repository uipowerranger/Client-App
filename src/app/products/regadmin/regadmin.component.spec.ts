import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegadminComponent } from './regadmin.component';

describe('RegadminComponent', () => {
  let component: RegadminComponent;
  let fixture: ComponentFixture<RegadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
