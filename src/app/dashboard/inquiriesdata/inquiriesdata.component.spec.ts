import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesdataComponent } from './inquiriesdata.component';

describe('InquiriesdataComponent', () => {
  let component: InquiriesdataComponent;
  let fixture: ComponentFixture<InquiriesdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiriesdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiriesdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
