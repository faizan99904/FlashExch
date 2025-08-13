import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkService } from '../../../service/network.service';


@Component({
  selector: 'app-video-ballby-ball',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-ballby-ball.component.html',
  styleUrl: './video-ballby-ball.component.css',
})
export class VideoBallbyBallComponent implements OnInit, OnDestroy {
  game: any = {};
  resultDeclared: any;
  ballbyBallStream: any;
  showBanner: any = false;
  public casinoFlag = 1;
  timerLeft: any;
  TIME_LIMIT = 0;
  timerInterval: any;
  timePassed = 0;
  timeLeft = 0;
  result: boolean = false;

  constructor(private networkService: NetworkService) {}

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.networkService.getRoundData().subscribe((data: any) => {
      this.game = data;
      this.gameManager();
    });
  }

  gameManager() {
    if (this.game?.oddsData?.status == 'SUSPENDED' || !this.game) {
      this.TIME_LIMIT = 0;
      this.timePassed = 0;
      this.timeLeft = 0;
      this.casinoFlag = 1;
      if(this.result){
        this.showBanner = true;
      }else{
        this.showBanner = false;
      }
   
      window.clearInterval(this.timerInterval);
    }

    if (this.game?.oddsData?.status == 'ONLINE') {
      if (this.game && this.casinoFlag == 1) {
       this.result=false;
        // let timeoutvalue= this.game?.oddsData?.video?.duration;
        // setTimeout(() => {
        //   this.showResult();
        //   setTimeout(() => {
        //    this.showBanner = true;
        //   }, 2000);
        //  }, (timeoutvalue - 2) * 1000);

         
        this.casinoFlag = 2;
        this.TIME_LIMIT = this.game?.oddsData?.seconds;

        if (this.TIME_LIMIT) {
          this.timeLeft = this.TIME_LIMIT;

          this.timerInterval = setInterval(() => {
            this.timeLeft = this.timeLeft - 1;
            if (this.TIME_LIMIT) {
              document.documentElement.style.setProperty(
                '--timerValue',
                this.TIME_LIMIT.toString() + 's'
              );
            }

            this.timerLeft = this.formatTimeLeft(this.timeLeft);
            // console.log("hyeeeee", this.timerLeft, " pass", this.timePassed)
            if (this.timeLeft == 0) {
              window.clearInterval(this.timerInterval);
            }

            if (this.timeLeft == 0 || this.timeLeft < 0) {
              this.timeLeft = 0;
              this.casinoFlag = 1;
              window.clearInterval(this.timerInterval);
            }
          }, 1000);
        }
      }
      // console.log("timer", this.TIME_LIMIT)
    }
    if (this.game?.oddsData?.status == 'SUSPENDED') {
      if (!this.showBanner) {
        //false
        let timeoutvalue= this.game?.oddsData?.video?.duration;
        // console.log('video duration',timeoutvalue)
        setTimeout(() => {
         this.showResult();
         setTimeout(() => {
          this.showBanner = true;
         }, 2000);
        }, (timeoutvalue - 2) * 1000);
      }
      var element1 = document.getElementById(
        'videoBallByball'
      ) as HTMLVideoElement;

      if (element1) {
        element1.muted = true;
        // element1.play();
      }

      if (!element1?.muted) {
        const intervalId = setInterval(() => {
          const element = document.getElementById(
            'videoBallByball'
          ) as HTMLVideoElement;
          if (element) {
            element.muted = true;
            if (element.muted) {
              clearInterval(intervalId);
            }
          }
        }, 10);
      }
    } else if (this.game?.oddsData?.status != 'SUSPENDED') {
      this.showBanner = false;
    }

    if (this.game?.oddsData?.video?.url) {
      const currentOrigin = window.location.origin;
       this.game.oddsData.video.url = this.game?.oddsData?.video?.url.replace('{$domain}', currentOrigin);

      // this.game.oddsData.video.url = this.game?.oddsData?.video?.url.replace(
      //   '{$domain}',
      //   'https://betever365.com'
      // );

      if (this.ballbyBallStream != this.game?.oddsData?.video?.url) {
        this.ballbyBallStream = this.game?.oddsData?.video?.url;
        // this.ballbyBallStream = 'https://casino.fancy22.com/api/users/images/ballbyball-2024889380422.mp4';
      }
    }
  }
  formatTimeLeft(time: any) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    var seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = parseInt(`0${seconds}`);
    }

    // The output in MM:SS format
    return seconds;
  }
  showResult(){
    this.result = true;
    // setTimeout(() => {
    //   this.resultDeclared = this.game?.oddsData?.video?.runs;
    // }, 1000);
    this.resultDeclared = this.game?.oddsData?.video?.runs;
    setTimeout(() => {
      this.resultDeclared = null;
    }, 2000);
  }
}
