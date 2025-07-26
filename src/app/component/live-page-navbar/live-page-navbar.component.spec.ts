import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePageNavbarComponent } from './live-page-navbar.component';

describe('LivePageNavbarComponent', () => {
  let component: LivePageNavbarComponent;
  let fixture: ComponentFixture<LivePageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivePageNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
