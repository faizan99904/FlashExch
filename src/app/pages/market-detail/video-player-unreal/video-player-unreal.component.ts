import { NgIf } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, NO_ERRORS_SCHEMA, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../../config';
import { NetworkService } from '../../../service/network.service';

declare var RunPlayer:any;
declare var closePlayback:any;

@Component({
  selector: 'app-video-player-unreal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './video-player-unreal.component.html',
  styleUrl: './video-player-unreal.component.css',
  schemas: [NO_ERRORS_SCHEMA] // Add this line
})
export class VideoPlayerUnrealComponent implements OnInit, AfterViewInit,OnDestroy {
  @Input() eventId: any;

  streamingName: any;
  streamingURl: any;
  myVideo: any = null;
  streamDate: any = [];
  showStream: boolean = false;

  currentState: boolean = false;
  constructor(private backendService: NetworkService, private toaster: ToastrService) {

  }

  
  ngOnInit(): void {
    this.getStreaming();
  }

  ngOnDestroy(): void {
  
    if(this.currentState && typeof closePlayback === 'function'){ 
      closePlayback();
    }
  //  
  }

  getStreaming() {
    setTimeout(() => {

      this.backendService.getAllRecordsByPost(CONFIG.videoStreamURL, {eventId: this.eventId}).then((res: any) => {
        this.streamDate = res?.data;
        // res?.data?.filter((item: any) => {
        //   if (item?.eventId == this.eventId) {
        //     this.streamingName = item?.streamingName;
        //     this.streamingURl = item?.url;
        //   }
        // });
        if(this.streamDate){

          this.streamingName = res?.data?.streamingName;
          this.streamingURl = res?.data?.url;
  
        }

        if (!this.streamDate  || this.streamDate.length < 1 || (this.streamingName == undefined || this.streamingName == null)) {
          this.toaster.error('We apologize, but streaming is not currently available.', '', {
            positionClass: 'toast-top-right',
          });
          this.showStream = false;
        }
        else {
          this.showStream = true;
          setTimeout(() => {

            if ("MediaSource" in window && "WebSocket" in window) {
              // RunPlayer(
              //   "UnrealPlayer1",
              //   '100%',
              //   '100%',
              //   "ltve.live",
              //   443,
              //   true,
              //   "ltve1",
              //   "",
              //   true,
              //   true,
              //   1,
              //   "/assets/video/bg.png",
              //   false
              // );
              RunPlayer(
                "UnrealPlayer1",
                '100%',
                '100%',
                this.streamingURl,
                443,
                true,
                this.streamingName,
                "",
                true,
                true,
                1,
                "/assets/video/bg.png",
                false
              );
              this.initializeVolumeControls();
              this.currentState=true;
            }

            if (!("MediaSource" in window && "WebSocket" in window)) {
              const playerElement = document.getElementById("UnrealPlayer1");
              if (playerElement) {
                playerElement.innerHTML = "Media Source Extensions or WebSockets are not supported in your browser.";
              }
            }
          }, 100);
        }

      });


    }, 1);


  }

  ngAfterViewInit(): void {
    // this.runPlayer();
    // initializeVolumeControls()
  }

  private runPlayer(): void {
    // RunPlayer(
    //   "UnrealPlayer1",
    //   '100%',
    //   '100%',
    //   "ltve.live",
    //   443,
    //   true,
    //   "ltve2",
    //   "",
    //   true,
    //   true,
    //   1,
    //   "/assets/video/bg.png",
    //   false
    // );
  }

  private initializeVolumeControls(): void {
    const videoPlayer = document.getElementById("UnrealPlayer1_Video") as HTMLVideoElement;
    const videoVolume = document.getElementById("UnrealPlayer1_volume");
    const videoControls = document.getElementById('UnrealPlayer1_videoControls');
    const volSlider = document.getElementById("UnrealPlayer1_volSlider") as HTMLInputElement;

    if (videoPlayer && videoVolume) {
      videoPlayer.muted = true; // Mute by default for autoplay policy
      this.updateVolumeState(videoPlayer, videoVolume);

      videoVolume.addEventListener('click', () => {
        if (volSlider) {
          volSlider.value = '1';
        }
        videoPlayer.muted = !videoPlayer.muted;
        this.updateVolumeState(videoPlayer, videoVolume);
        setTimeout(() => {
          if (videoControls) {
            videoControls.style.display = "none";
          }
        }, 3000);
      });
    }
  }

  private updateVolumeState(videoPlayer: HTMLVideoElement, videoVolume: HTMLElement): void {
    if (videoVolume) {
      videoVolume.dataset['state'] = videoPlayer.muted ? 'mute' : 'volume';
    }
  }
}


function extractNumericValue(text: any) {
  const sanitizedText = text?.replace(/,/g, '').trim();
  return isNaN(parseFloat(sanitizedText)) ? undefined : parseFloat(sanitizedText);
}

function isValidValue(value: any) {
  return value !== undefined && !isNaN(value);
}

// declare function RunPlayer(
//   id: string,
//   width: string,
//   height: string,
//   ip: string,
//   port: number,
//   useSecure: boolean,
//   streamName: string,
//   token: string,
//   autoPlay: boolean,
//   muted: boolean,
//   videoQuality: number,
//   backgroundImage: string,
//   showControls: boolean
// ): void;