import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePageComponent } from './live-page.component';

describe('LivePageComponent', () => {
  let component: LivePageComponent;
  let fixture: ComponentFixture<LivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
