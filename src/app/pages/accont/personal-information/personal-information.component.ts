import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personal-information',
  imports: [],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
