import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitlossEventComponent } from './profitloss-event.component';

describe('ProfitlossEventComponent', () => {
  let component: ProfitlossEventComponent;
  let fixture: ComponentFixture<ProfitlossEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitlossEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitlossEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
