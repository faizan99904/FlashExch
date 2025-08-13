import { NgIf } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  styleUrls: ['./tennis.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class TennisComponent {

  @Input() sportObj: any = [];
  @Input() isMuted: any = [];
  @Input() isScore: any;

  ScoreCardSubscription: any;
  gameScore: any = [];
  sportId: any;
  sportName: any;
  slider: any = [];
  commentry: any;
  Audio: any;
  totalSets:any;


  isTestMatch: boolean = false;
  constructor(
    @Inject('firebaseProjectScore') private scoreFirebase: AngularFirestore,
  ) {

  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.ScoreCardSubscription) {
      this.ScoreCardSubscription.unsubscribe()
    }
  }
  ngOnInit(): void {
    this.getBetfairDataFirebase();
    // setInterval(()=>{
    // })
  }

  audioContext: any;
  audioBuffer: any;
  async loadAudio() {
    const response = await fetch('assets/ScoreAudios/audio1.ogg');
    const audioData = await response.arrayBuffer();
    this.audioContext = new AudioContext();
    this.audioBuffer = await this.audioContext.decodeAudioData(audioData);
  }
  playAudio() {
    this.loadAudio()
      .then(() => {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      })
      .catch(error => {
        console.error('Error loading or playing audio:', error);
      });
  }
  getBetfairDataFirebase() {
    let collection: any;

    this.ScoreCardSubscription = this.scoreFirebase.collection('tennisScore', ref => ref.where('eventId', '==', this.sportObj?.event_id))
      .stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {
          
          const pt: any = change.payload.doc.data();
          const currentid = change.payload.doc.id;
          if (change.type === 'added') {
            this.assignCricetScore(pt);
          }
          if (change.type == 'modified') {
            // arry.push(pt);
            this.assignCricetScore(pt);

          }
          if (change.type == 'removed') {

          }
        });
      });
  }
  assignCricetScore(pt: any) {
    try {
      if(!pt.slider){
        return
      }
      this.slider = pt?.slider;
      this.commentry = this.slider[0]?.score?.statusCommentry;
  
      this.totalSets = this.FetchSets(this.slider[0]?.score?.scoreItems[0]?.scoreData)
    } catch (error) {
      console.error('Error in score:', error);
    }
   
  }
  FetchSets(scoreItems: any) {
    var extractedArrays = [];
    var startFlag = false;
    let obj = scoreItems;
    for (var i = 0; i < obj?.length; i++) {
      if (obj[i].displayText === "SETS") {
        startFlag = true;
        continue;
      }

      if (obj[i].displayText === "PTS") {
        break;
      }

      if (startFlag) {
        extractedArrays.push(obj[i]);
      }
    }
    return extractedArrays
  }
  // checkServer(sliderScore:any){

  //   sliderScore.filter((data:any)=>{
  //     if(data.iconName == "server" || data.id==17){
  //       return true
  //     }
  //   })
  // }
}
