import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from "../../services/offer-service/offer.service";
import { AuthService } from "../../services/auth-service/auth.service";
import { ToastrService } from "../../services/toastr-service/toastr.service";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profileData;
  catalog;

  permissions: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private offerService: OfferService,
    private toastr: ToastrService) {
    router.events.subscribe((val) => {
      this.permissions = localStorage.getItem('authtoken') !== null;
    });
  }

  ngOnInit() {
    this.authService.getUserById(localStorage.getItem("userId")).subscribe(userData => { // this.offerService.getMyOffers(userData._id).subscribe(offers => {
      this.offerService.getOffers().subscribe(offers => {
        this.profileData = userData;
        let myOffers = [];

        for (let offer of offers) {
          if (offer._acl.creator === userData._id) {
            myOffers.push(offer);
          }
        }

        this.catalog = myOffers;
        console.log(this.catalog)
        console.log(this.profileData)
        this.permissions = localStorage.getItem('authtoken') !== null;
      },
        err => {
          this.catalog = [];
          this.toastr.errorToast((err.error.description ? err.error.description : 'Cannot get your offers. Please try again'));
        });
    }),
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Authentication error. Please try again'));
      }

  }

  updateData() {
    this.authService.updateUserWithObj(this.profileData, this.profileData._id).subscribe(res => {
      this.toastr.successToast("User information was updated successfully.")
      this.router.navigate(['/offers']);
    }),
      err => {
        this.toastr.errorToast("Error: " + err);
      }
  }
}
