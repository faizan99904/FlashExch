import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitlossMarketComponent } from './profitloss-market.component';

describe('ProfitlossMarketComponent', () => {
  let component: ProfitlossMarketComponent;
  let fixture: ComponentFixture<ProfitlossMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitlossMarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitlossMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
