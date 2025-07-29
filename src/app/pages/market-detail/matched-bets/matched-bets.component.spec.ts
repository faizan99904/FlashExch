import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedBetsComponent } from './matched-bets.component';

describe('MatchedBetsComponent', () => {
  let component: MatchedBetsComponent;
  let fixture: ComponentFixture<MatchedBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchedBetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchedBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
