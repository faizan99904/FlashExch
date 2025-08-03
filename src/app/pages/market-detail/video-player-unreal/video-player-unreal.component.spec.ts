import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerUnrealComponent } from './video-player-unreal.component';

describe('VideoPlayerUnrealComponent', () => {
  let component: VideoPlayerUnrealComponent;
  let fixture: ComponentFixture<VideoPlayerUnrealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerUnrealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoPlayerUnrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
