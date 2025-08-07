import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryDetailsComponent } from './lottery-details.component';

describe('LotteryDetailsComponent', () => {
  let component: LotteryDetailsComponent;
  let fixture: ComponentFixture<LotteryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
