import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBallbyBallComponent } from './video-ballby-ball.component';

describe('VideoBallbyBallComponent', () => {
  let component: VideoBallbyBallComponent;
  let fixture: ComponentFixture<VideoBallbyBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoBallbyBallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoBallbyBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
