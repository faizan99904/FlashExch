import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-view',
  imports: [CommonModule],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css',
})
export class EventViewComponent {
  @ViewChild('markets') markets!: ElementRef;
  moved: boolean = true;
  searchTrue: boolean = false;
  activeTab = 'All';
  currentTranslateX = 0;
  firstMoveDone = false;
  collapsed: { [key: number]: boolean } = {
    1: true,
    2: true,
    3: true,
  };

  tabs = [
    { label: 'All' },
    { label: 'Bet Builder', isBetBuilder: true },
    { label: 'Results' },
    { label: 'total' },
    { label: 'Handicap' },
    { label: 'Bet Builder', isBetBuilder: true },
    { label: 'Results' },
    { label: 'total' },
    { label: 'Handicap' },
    { label: 'Bet Builder', isBetBuilder: true },
    { label: 'Results' },
    { label: 'total' },
    { label: 'Handicap' },
    { label: 'Bet Builder', isBetBuilder: true },
    { label: 'Results' },
    { label: 'total' },
    { label: 'Handicap' },
  ];
  ngAfterViewInit(): void {
    this.applyTransform();
  }

  right() {
    if (!this.firstMoveDone) {
      this.currentTranslateX += 70;
      this.firstMoveDone = true;
    } else {
      this.currentTranslateX += 140;
    }
    this.applyTransform();
    this.moved = false;
  }

  left() {
    if (this.currentTranslateX === 70 && this.firstMoveDone) {
      this.currentTranslateX = 0;
      this.firstMoveDone = false;
      this.moved = true;
    } else if (this.currentTranslateX > 0) {
      this.currentTranslateX -= 140;
    }

    if (this.currentTranslateX < 0) {
      this.currentTranslateX = 0;
      this.firstMoveDone = false;
    }

    this.applyTransform();
  }

  applyTransform() {
    this.markets.nativeElement.style.transform = `translateX(-${this.currentTranslateX}px)`;
  }

  toggleCollapse(index: number): void {
    this.collapsed[index] = !this.collapsed[index];
  }
}
