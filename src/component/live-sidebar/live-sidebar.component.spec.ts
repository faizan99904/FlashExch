import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSidebarComponent } from './live-sidebar.component';

describe('LiveSidebarComponent', () => {
  let component: LiveSidebarComponent;
  let fixture: ComponentFixture<LiveSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
