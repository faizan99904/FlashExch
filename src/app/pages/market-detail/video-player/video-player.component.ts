import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../../config';
import { NetworkService } from '../../../service/network.service';


declare var T20RTCPlayer: any;
declare var $: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  standalone:true,
  imports:[CommonModule],
})
export class VideoPlayerComponent implements OnInit {

  @Input() eventId: any;

  streamingName: any;
  streamingURl: any;
  myVideo: any = null;
  streamDate: any = [];
  showStream: boolean = false;

  constructor(private backendService: NetworkService, private toaster: ToastrService) {

  }

  ngOnInit(): void {
    this.getStreaming();
    setTimeout(() => {
      this.autoRun();
    }, 150);
  }


  getStreaming() {
    var webrtcPlayer = null;
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

            webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "", this.streamingURl, "", true, true, "tcp");
            // webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "","strikexch.live", "", true, true, "tcp");
            // webrtcPlayer = new T20RTCPlayer("remoteVideo", "ltve10", "", "ltve.live", "", false, false, "tcp");
            webrtcPlayer.Play();
          }, 100);
        }

      });


    }, 1);


  }

  autoRun() {
    if (this.showStream) {
      this.myVideo = document.getElementById('remoteVideo');
      // Not all browsers return promise from .play().
      const playPromise = this.myVideo.play() || Promise.reject('');
      playPromise.then(() => {
        // Video could be autoplayed, do nothing.
      }).catch(() => {
        // Video couldn't be autoplayed because of autoplay policy. Mute it and play.
        this.myVideo.muted = true;
        this.myVideo.play();
      });
    }


  }


}
