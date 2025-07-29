import { Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minigames',
  imports: [
    FooterComponent,
    BottomNavComponent,
    CommonModule,
  ],
  templateUrl: './minigames.component.html',
  styleUrl: './minigames.component.css',
})
export class MinigamesComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('cardInner') cardInner!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('image') image!: ElementRef;

  cardInnerStyle = {};
  titleStyle = {};
  imageStyle = {};

  handleMouseMove(event: MouseEvent) {
    const rect = this.imageContainer.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 5;
    const rotateY = -(x - centerX) / 5;

    const translateX = (x - centerX) / 10;
    const translateY = (y - centerY) / 10;

    this.cardInnerStyle = {
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: '0.05s',
    };

    this.imageStyle = {
      transform: `translateX(0px) translateY(0px)`,
      transition: 'all',
    };

    this.titleStyle = {
      transform: `translateX(${translateX / 2}px) translateY(${
        translateY / 2
      }px)`,
      transition: 'all',
    };
  }

  resetTransforms() {
    this.cardInnerStyle = {
      transform: 'none',
      transition: '1s',
    };
    this.imageStyle = {
      transform: 'translateX(0) translateY(0)',
      transition: '0.4s',
    };
    this.titleStyle = {
      transform: 'translateX(0) translateY(0)',
      transition: '0.4s',
    };
  }
}
