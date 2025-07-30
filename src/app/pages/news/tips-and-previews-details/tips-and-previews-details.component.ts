import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tips-and-previews-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips-and-previews-details.component.html',
  styleUrls: ['./tips-and-previews-details.component.css']
})
export class TipsAndPreviewsDetailsComponent implements OnInit {
  @Input() item: any = {};
  @Output() newItemEvent = new EventEmitter<any>();
  date= Date()

  constructor(){

  }
  ngOnInit(): void {
    // console.log(this.item,'')
    setTimeout(() => {
      let element =  document.getElementById('focusContainer') as HTMLElement;
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }, 100);

  }
  gotoBack(){
    this.newItemEvent.emit(false);
  }
}
