import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsBookComponent } from './sports-book.component';

describe('SportsBookComponent', () => {
  let component: SportsBookComponent;
  let fixture: ComponentFixture<SportsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
