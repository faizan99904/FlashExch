import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportslistComponent } from './sportslist.component';

describe('SportslistComponent', () => {
  let component: SportslistComponent;
  let fixture: ComponentFixture<SportslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
