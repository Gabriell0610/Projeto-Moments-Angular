import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentDetailsComponent } from './moment-details.component';

describe('MomentDetailsComponent', () => {
  let component: MomentDetailsComponent;
  let fixture: ComponentFixture<MomentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
