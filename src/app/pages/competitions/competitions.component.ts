import { Component, effect, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SportsNavComponent } from '../../shared/sports-nav/sports-nav.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-competitions',
  imports: [
    CommonModule,
    HeaderComponent,
    SportsNavComponent,
    BottomNavComponent,
    RouterLink
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css',
})
export class CompetitionsComponent implements OnInit{
  activeTab: any
  timeFilters: boolean = true;
  competitions:any=[];
  sportId:any;
  filter:any='ALL';
  AllEvents:any=[];
  competitionsArr:any=[];
  timeFilter = [
    'ALL',
    '1 Hour',
    '2 Hours',
    '4 Hours',
    '8 Hours',
    '12 Hours',
    '1 Day',
    '2 Days',
    '4 Days',
    '8 Days',
  ]

  constructor(private route:ActivatedRoute,private mainService:MainService){
    this.route.params.subscribe(params => {
      this.sportId = params['id'];
      this.mainService.setActiveSport(this.sportId)
      this.checkTabs()
    })
    effect(() => {
      this.sportId = this.mainService.getActiveSport();
      
      this.AllEvents = this.mainService.getAllEvents();
      if(this.AllEvents){
        console.log('all events',this.AllEvents)
        this.getAllEvents();
      }
     
    });
   
  }
  ngOnInit(): void {
    // this.getAllEvents();
  }
  checkTabs(){
    if(this.sportId!='ALL'){
      this.activeTab='comp'
    }
    else{
      this.activeTab='upcoming'
    }
  }
  getAllEvents(){
   
    if(this.activeTab=='comp' && this.AllEvents){
      this.competitionsArr = this.RearrangingData(this.AllEvents[this.sportId])
      console.log('comp',this.competitionsArr)
    }
  }
  toggle(state: string) {
    if (state === 'time') {
      this.timeFilters = !this.timeFilters;
    } 
  }
  openCompetition(index:any){
    if(!this.competitions[index]){
      this.competitions[index]=true;
    }
    else{
      this.competitions[index]=false;
    }
  }
  changeCompetitonTimeFilter(filter:any){
    this.filter = filter;
    this.toggle('time')
  }
  RearrangingData(data: any) {
    const uniqueSportsArray = data.reduce((acc: any[], item: any) => {
      const existingTournament = acc.find((t: any) => t.competitionId === item?.tournamentId);

      if (existingTournament) {
        existingTournament.data.push(item);
      } else {
        acc.push({
          competitionId: item?.tournamentId,
          competitionName: item?.tournamentName,
          data: [item]
        });
      }

      return acc;
    }, []);
    uniqueSportsArray.forEach((tournament: any) => {
      tournament.data.sort((a: any, b: any) => {
        const matchedA = a?.oddsData?.totalMatched ?? a?.totalMatched ?? 0;
        const matchedB = b?.oddsData?.totalMatched ?? b?.totalMatched ?? 0;
        return matchedB - matchedA;
      });
    });

    return uniqueSportsArray;
  }
  getEventName(first: boolean, eventName: any) {
    let splitArray = eventName.split(' v ');
    if (first) {
      return splitArray[0];
    }
    else {
      return splitArray[1];
    }
  }
}
