import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWaitingComponent } from './payment-waiting.component';

describe('PaymentWaitingComponent', () => {
  let component: PaymentWaitingComponent;
  let fixture: ComponentFixture<PaymentWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentWaitingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
