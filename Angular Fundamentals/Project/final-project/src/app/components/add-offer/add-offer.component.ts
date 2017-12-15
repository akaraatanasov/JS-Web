import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "../../services/toastr-service/toastr.service";
import { RouterAuthService } from "../../services/router-auth-service/router-auth.service";
import { OfferService } from "../../services/offer-service/offer.service";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: 'ap p-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  bitValue: number;
  eurValue: number;
  acceptsBargains: boolean = false;
  status: string = "active";

  offerUploaded: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private routerAuth: RouterAuthService,
    private offerService: OfferService,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (!this.routerAuth.canAccess()) {
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    }
  }

  submitAddOffer() {
    console.log(this.bitValue);
    console.log(this.eurValue);
    console.log(this.acceptsBargains);
    console.log(this.status);

    if (this.bitValue === undefined) {
      this.toastr.errorToast('Please specify Bitcoin value.');
      return;
    }

    if (this.eurValue === undefined) {
      this.toastr.errorToast('Please specify Euro value.');
      return;
    }

    let userId = localStorage.getItem('userId');
    let userBtc: number;
    let userEur: number;

    this.authService.getUserById(userId).subscribe(userData => {
      userBtc = userData.bitBalance;
      userEur = userData.eurBalance;

      if (userBtc >= this.bitValue) {
        this.offerService.addOffer(this.bitValue, this.eurValue, this.acceptsBargains, this.status).subscribe(data => {
          this.toastr.successToast('Offer added.');
        },
          err => {
            this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
          });
  
        userBtc -= this.bitValue;
        userEur += this.eurValue;
  
        this.authService.updateUserById(userBtc, userEur, userData.iban, userData.wallet, userData.email, userData.name, userId).subscribe(userData => {
          this.toastr.successToast('Transaction made.');
          this.router.navigate(['/offers']);
        }),
          err => {
            this.toastr.errorToast((err.error.description ? err.error.description : 'Transaction was not made.'));
            this.router.navigate(['/offers']);
          };
      } else {
        this.toastr.errorToast("You don't have enough BTC");
        console.log(this.bitValue)
        console.log(userBtc);
      }
    }),
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Your data did not come through.'));
      };


    
  }

  getBack() {
    window.history.back();
  }
}
