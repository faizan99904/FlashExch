import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRealComponent } from './video-real.component';

describe('VideoRealComponent', () => {
  let component: VideoRealComponent;
  let fixture: ComponentFixture<VideoRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoRealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
