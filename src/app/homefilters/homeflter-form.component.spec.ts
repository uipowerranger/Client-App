import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeFiltersComponent } from './homefilters.component';

describe('HomeFiltersComponent', () => {
  let component: HomeFiltersComponent;
  let fixture: ComponentFixture<HomeFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFiltersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
