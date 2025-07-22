import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsNavComponent } from './sports-nav.component';

describe('SportsNavComponent', () => {
  let component: SportsNavComponent;
  let fixture: ComponentFixture<SportsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
