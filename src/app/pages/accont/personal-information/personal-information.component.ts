import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';
import { Router, RouterLink } from '@angular/router';
import { ChangePassComponent } from '../../../shared/change-pass/change-pass.component';

@Component({
  selector: 'app-personal-information',
  imports: [RouterLink, CommonModule, ChangePassComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent {
  passModal: boolean = false;
  user: any = [];

  constructor(
    private location: Location,
    private backenservice: NetworkService,
    private router: Router
  ) {}
  goBack(): void {
    this.location.back();
  }

  navigate() {
    let width = window.innerWidth;
    if (width < 1024) {
      this.router.navigateByUrl('/account/change-password');
    } else {
      this.passModal = true;
    }
  }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  getProfileInfo() {
    this.backenservice
      .getAllRecordsByPost(CONFIG.userProfile, {})
      .then((data: any) => {
        if (data.meta && data.meta.status === true) {
          this.user = data.data;
          // console.log(this.user);
        }
      })
      .catch((error) => {
        console.error('Error in userProfile request:', error);
      });
  }
}
