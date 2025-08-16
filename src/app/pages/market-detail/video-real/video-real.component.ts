import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../service/main.service';
import { NetworkService } from '../../../service/network.service';

@Component({
  selector: 'app-video-real',
  standalone: true,
  imports: [NgIf],
  templateUrl: './video-real.component.html',
  styleUrl: './video-real.component.css',
})
export class VideoRealComponent implements OnInit, AfterViewInit, OnDestroy {
  videoPlayer: any;
  @Input() eventId: any;
  @Output() dataEmitter = new EventEmitter<boolean>();

  private canAutoPiP = false;
  private piPTimer: any;
  private observer: IntersectionObserver | null = null;
  private pipManager: any = null;
  streamingName: any;
  streamingURl: any;
  eventId1: any;
  streamDate: any = [];
  showStream: boolean = false;
  depositfunds: boolean = true;
  currentState: boolean = false;
  streamingAppName: any;
  streamingToken: any;
  loader:boolean = true;
  private visibilityChangeHandler: () => void;

  constructor(
    private networkService: NetworkService,
    private toaster: ToastrService,
    private mainService: MainService
  ) {
    // Bind the visibility change handler to maintain proper 'this' context
    this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
     effect(() => {
      this.eventId1 = this.mainService.getEventId();
      if(this.eventId1){
        this.eventId=this.eventId1
         this.getStreaming();
      }
      // console.log('this.eventId1',this.eventId1)
     })
  }

  ngOnInit(): void {
    
  
    this.videoPlayer = document.getElementById('video-player_html5_api');
   

    // Add Page Visibility API listener to handle tab visibility changes
    this.setupVisibilityListener();
  }

  ngAfterViewInit() {}

  /**
   * Setup Page Visibility API listener to handle tab visibility changes
   * This will stop and destroy the video when the tab is hidden (minimized/switched)
   */
  private setupVisibilityListener(): void {
    if (typeof document !== 'undefined' && 'visibilityState' in document) {
      document.addEventListener(
        'visibilitychange',
        this.visibilityChangeHandler
      );
    }
  }

  /**
   * Handle visibility change events
   * When tab becomes hidden: stop and destroy video player
   * When tab becomes visible: optionally reinitialize (currently disabled to prevent auto-restart)
   */
  private async handleVisibilityChange(): Promise<void> {
    if (document.visibilityState === 'hidden') {
      // Tab is hidden (minimized, switched to another app, etc.)
      if (
        this.streamingAppName != null &&
        this.streamingURl != null &&
        this.streamingName != null
      ) {
        await this.destroyVideo();
        this.showStream = false;
        // this.dataEmitter.emit(false);
      }
    } else if (document.visibilityState === 'visible') {
      // Tab is visible again
      // Optionally reinitialize video when tab becomes visible again
      if (this.streamDate && !this.showStream) {
        // Preserve the current UI state to avoid flash
        const videoInfo = document.getElementById('video_info');
        const videoContainer = document.getElementById('video_container');
        const currentVideoInfoDisplay = videoInfo?.style.display || '';
        const currentVideoContainerDisplay =
          videoContainer?.style.display || '';

        // Set showStream first to prevent Angular from hiding the component
        this.showStream = true;

        // Use setTimeout to ensure Angular has processed the showStream change
        setTimeout(() => {
          this.dataEmitter.emit(true);
          this.initializeVideoSmoothly(
            this.streamDate,
            currentVideoInfoDisplay,
            currentVideoContainerDisplay
          );
        }, 0);
      }
    }
  }

  /**
   * Reset video container UI elements to proper initial state after reinitializing
   */
  private resetVideoContainerUI(): void {
    // Show loading screen (video_info) first during reinitialization
    const videoInfo = document.getElementById('video_info');
    if (videoInfo) {
      videoInfo.style.display = 'flex';
    }

    // Hide video_container initially during reinitialization
    const videoContainer = document.getElementById('video_container');
    if (videoContainer) {
      videoContainer.style.display = 'none';
    }

    // Reset unmute button to show VolumeOff.svg (muted state)
    const unmuteButton = document.getElementById('unmuteButton');
    if (unmuteButton) {
      unmuteButton.innerHTML =
        '<img src="/assets/video/VolumeOff.svg" style="width: 4vh;height: 4vh;" alt="Volume Off" />';
    }
  }

  /**
   * Show video container and hide loading screen after video is ready
   * This should be called by the embedded player when video is initialized
   */
  private showVideoContainer(): void {
    // Hide loading screen (video_info)
    const videoInfo = document.getElementById('video_info');
    if (videoInfo) {
      videoInfo.style.display = 'none';
    }

    // Show video container
    const videoContainer = document.getElementById('video_container');
    if (videoContainer) {
      videoContainer.style.display = 'flex';
    }
  }

  /**
   * Remove Page Visibility API listener
   */
  private removeVisibilityListener(): void {
    if (typeof document !== 'undefined') {
      document.removeEventListener(
        'visibilitychange',
        this.visibilityChangeHandler
      );
    }
  }

  getStreaming() {
    var req = {
      eventId: this.eventId,
    };
    console.log('ever',this.eventId)
    this.networkService.getStreamData(req).subscribe((res: any) => {
      this.loader=false;
      this.streamDate = res.data;
      this.streamingName = this.streamDate?.streamingName;
      this.streamingURl = this.streamDate?.url;
      this.streamingToken = this.streamDate?.token;
      this.streamingAppName = this.streamDate?.appName;

      if (
        this.streamingAppName == null ||
        this.streamingURl == null ||
        this.streamingName == null
      ) {
        this.toaster.error(
          'We apologize, but streaming is not currently available.',
          '',
          {
            positionClass: 'toast-top-center',
          }
        );
        this.showStream = false;
        this.dataEmitter.emit(false);
      } else {
        this.showStream = true;

        this.dataEmitter.emit(true);
        const elements = document.querySelectorAll('.userTotalBalance');
        const userTotalExposure =
          document.querySelectorAll('.userTotalExposure');

        if (elements.length > 0 && elements[0]) {
          const balanceValue: any = extractNumericValue(
            elements[0].textContent
          );
          const exposureValue: any =
            userTotalExposure.length > 0
              ? extractNumericValue(userTotalExposure[0].textContent)
              : undefined;

          if (
            isValidValue(balanceValue) &&
            balanceValue < 100 &&
            isValidValue(exposureValue) &&
            exposureValue < 100
          ) {
            this.depositfunds = false;
          } else {
            this.depositfunds = true;
          }
        }

        //set stream
        if (
          this.streamingAppName != null &&
          this.streamingURl != null &&
          this.streamingName != null
        ) {
          this.initializeVideo(this.streamDate);
        }
      }
    });
  }

  script1: HTMLScriptElement | null = null;
  script2: HTMLScriptElement | null = null;

  initializeVideo(obj: any) {
    this.destroyVideo(); // Cleanup before (re)initializing

    // Create & append script 1
    this.script1 = document.createElement('script');
    this.script1.type = 'module';
    this.script1.src =
      '/assets/js/real-media-embedded-player.js?v=' + Date.now(); // bust cache

    this.script1.onload = () => {
      if ((window as any)['createWebPlayer']) {
        const config = {
          streamUrl: 'wss://' + obj.url + '/',
          appName: obj.appName + '/',
          streamId: obj.streamingName,
          token: obj.token,
        };
        (window as any).createWebPlayer?.(config);

        // Reset UI elements immediately after video initialization starts
        this.resetVideoContainerUI();

        // After video is ready, show the video container and hide loading screen
        setTimeout(() => {
          this.showVideoContainer();

          // Delay Picture-in-Picture initialization
          import('../../../../../public/assets/js/picture-in-picture.js' as any).then(() => {
            this.pipManager = new (window as any).PictureInPictureManager(
              'video-player_html5_api'
            );
          });
        }, 1500);
      }
    };

    document.body.appendChild(this.script1);
  }

  /**
   * Initialize video smoothly without UI flash when returning from tab switch
   */
  initializeVideoSmoothly(
    obj: any,
    preserveVideoInfoDisplay: string,
    preserveVideoContainerDisplay: string
  ) {
    // Preserve current UI state BEFORE any cleanup
    const videoInfo = document.getElementById('video_info');
    const videoContainer = document.getElementById('video_container');
    const wasShowingVideo =
      preserveVideoContainerDisplay === 'flex' ||
      preserveVideoContainerDisplay === 'block';

    // Store current display states
    let currentVideoInfoDisplay = videoInfo?.style.display || '';
    let currentVideoContainerDisplay = videoContainer?.style.display || '';

    // Only do minimal cleanup without affecting UI
    this.cleanupVideoScriptsOnly();

    // Create & append script 1
    this.script1 = document.createElement('script');
    this.script1.type = 'module';
    this.script1.src =
      '/assets/js/real-media-embedded-player.js?v=' + Date.now(); // bust cache

    this.script1.onload = () => {
      if ((window as any)['createWebPlayer']) {
        const config = {
          streamUrl: 'wss://' + obj.url + '/',
          appName: obj.appName + '/',
          streamId: obj.streamingName,
          token: obj.token,
        };
        (window as any).createWebPlayer?.(config);

        // If video was showing, keep it showing during reinitialization
        if (wasShowingVideo) {
          // Keep video container visible
          if (videoInfo) {
            videoInfo.style.display = 'none';
          }
          if (videoContainer) {
            videoContainer.style.display = 'flex';
          }

          // Reset unmute button to show VolumeOff.svg (muted state)
          const unmuteButton = document.getElementById('unmuteButton');
          if (unmuteButton) {
            unmuteButton.innerHTML =
              '<img src="/assets/video/VolumeOff.svg" style="width: 4vh;height: 4vh;" alt="Volume Off" />';
          }
        } else {
          // We were showing loading screen, so reset to loading state
          this.resetVideoContainerUI();

          // Listen for the webPlayer's play event instead of using setTimeout
          this.setupVideoReadyListener();
        }

        // Initialize Picture-in-Picture immediately since video container is ready
        import('../../../../../public/assets/js/picture-in-picture.js' as any).then(() => {
          this.pipManager = new (window as any).PictureInPictureManager(
            'video-player_html5_api'
          );
        });
      }
    };

    document.body.appendChild(this.script1);
  }

  /**
   * Setup listener for when video is actually ready to play
   */
  private setupVideoReadyListener(): void {
    // Listen for the webPlayer's play event which indicates video is ready
    if ((window as any).webPlayer) {
      (window as any).webPlayer.addPlayerListener((status: string) => {
        if (status === 'play') {
          // Video is actually playing, now we can safely show the container
          this.showVideoContainer();
        }
      });
    } else {
      // Fallback: wait for webPlayer to be available
      const checkWebPlayer = () => {
        if ((window as any).webPlayer) {
          (window as any).webPlayer.addPlayerListener((status: string) => {
            if (status === 'play') {
              this.showVideoContainer();
            }
          });
        } else {
          setTimeout(checkWebPlayer, 100);
        }
      };
      checkWebPlayer();
    }
  }

  /**
   * Cleanup only scripts and PiP without affecting UI elements
   */
  private cleanupVideoScriptsOnly() {
    // Exit PIP first
    this.forceExitAllPIP();

    // Destroy PiP manager
    if (this.pipManager && typeof this.pipManager.destroy === 'function') {
      this.pipManager.destroy();
      this.pipManager = null;
    }

    // Try to call the web player destroy function
    try {
      if ((window as any).destroyAndResetWebPlayer) {
        (window as any).destroyAndResetWebPlayer();
      }
    } catch (error) {
      // Silent error handling
    }

    // Remove scripts only
    if (this.script1) {
      try {
        document.body.removeChild(this.script1);
      } catch (error) {
        // Silent error handling
      }
      this.script1 = null;
    }
    if (this.script2) {
      try {
        document.body.removeChild(this.script2);
      } catch (error) {
        // Silent error handling
      }
      this.script2 = null;
    }

    // Clear timers
    if (this.piPTimer) {
      clearTimeout(this.piPTimer);
    }

    this.canAutoPiP = false;
  }

  // ✅ Cleanup method
  async destroyVideo() {
    // Multiple attempts to exit PIP BEFORE destroying anything
    await this.forceExitAllPIP();

    // Destroy PiP manager first while DOM elements still exist
    if (this.pipManager && typeof this.pipManager.destroy === 'function') {
      await this.pipManager.destroy();
      this.pipManager = null;
    }

    // Try to call the web player destroy function BEFORE removing scripts
    try {
      if ((window as any).destroyAndResetWebPlayer) {
        (window as any).destroyAndResetWebPlayer();
      }
    } catch (error) {
      // Silent error handling
    }

    // Now remove scripts and cleanup
    if (this.script1) {
      try {
        document.body.removeChild(this.script1);
      } catch (error) {
        // Silent error handling
      }
      this.script1 = null;
    }
    if (this.script2) {
      try {
        document.body.removeChild(this.script2);
      } catch (error) {
        // Silent error handling
      }
      this.script2 = null;
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    ['mousedown', 'keydown', 'touchstart'].forEach((evt) => {
      document.removeEventListener(evt, () => {}, true); // Or keep a reference to your actual listener
    });

    if (this.piPTimer) {
      clearTimeout(this.piPTimer);
    }

    this.canAutoPiP = false;
  }

  // Comprehensive PIP exit method
  private async forceExitAllPIP() {
    // Method 1: Global force exit function
    if ((window as any).forceExitPictureInPicture) {
      await (window as any).forceExitPictureInPicture();
    }

    // Method 2: Direct video element check
    const videoElement = document.getElementById(
      'video-player_html5_api'
    ) as any;
    if (videoElement) {
      // Check if it's a VideoJS player
      if (videoElement.player) {
        const player = videoElement.player;

        if (player.isInPictureInPicture && player.isInPictureInPicture()) {
          try {
            await player.exitPictureInPicture();
          } catch (error) {
            // Silent error handling
          }
        }
      }

      // Check if it's in standard PIP
      if (document.pictureInPictureElement === videoElement) {
        try {
          await document.exitPictureInPicture();
        } catch (error) {
          // Silent error handling
        }
      }
    }

    // Method 3: Check all VideoJS players
    if ((window as any).videojs && (window as any).videojs.getAllPlayers) {
      const players = (window as any).videojs.getAllPlayers();
      for (let player of players) {
        if (player.isInPictureInPicture && player.isInPictureInPicture()) {
          try {
            await player.exitPictureInPicture();
          } catch (error) {
            // Silent error handling
          }
        }
      }
    }

    // Method 4: Standard document PIP check
    if (document.pictureInPictureElement) {
      try {
        await document.exitPictureInPicture();
      } catch (error) {
        // Silent error handling
      }
    }
  }

  async ngOnDestroy() {
    // Remove Page Visibility API listener
    this.removeVisibilityListener();

    // Force exit PIP immediately as first step
    await this.forceExitAllPIP();

    // Cleanup observers and event listeners
    if (this.observer && this.videoPlayer) {
      this.observer.unobserve(this.videoPlayer.nativeElement);
      this.observer.disconnect();
    }

    if (
      this.streamingAppName != null &&
      this.streamingURl != null &&
      this.streamingName != null
    ) {
      await this.destroyVideo();

      // Additional cleanup for PiP manager if still exists
      if (this.pipManager && typeof this.pipManager.destroy === 'function') {
        await this.pipManager.destroy();
        this.pipManager = null;
      }
    }
  }
}
function extractNumericValue(text: any) {
  const sanitizedText = text?.replace(/,/g, '').trim();
  return isNaN(parseFloat(sanitizedText))
    ? undefined
    : parseFloat(sanitizedText);
}

function isValidValue(value: any) {
  return value !== undefined && !isNaN(value);
}
