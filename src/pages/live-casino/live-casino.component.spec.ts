import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCasinoComponent } from './live-casino.component';

describe('LiveCasinoComponent', () => {
  let component: LiveCasinoComponent;
  let fixture: ComponentFixture<LiveCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveCasinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
