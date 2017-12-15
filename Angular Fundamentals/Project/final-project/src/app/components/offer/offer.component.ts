import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from "../../services/toastr-service/toastr.service";
import { AuthService } from "../../services/auth-service/auth.service";
import 'rxjs/add/operator/toPromise';

//import {Router} from "@angular/router";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer;
  @Input() permissions;
  //@Input() catalog;
  bargainPrice: number;
  isAdmin: boolean;

  seller;
  buyer;

  constructor(private toastr: ToastrService, private authService: AuthService) {//, private router: Router) { //private catalogService: CatalogService
  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') !== 'init';

    // get buyerId
    let buyerId = localStorage.getItem('userId');
    // get sellerId
    let sellerId = this.offer._acl.creator;

    this.authService.getUserById(sellerId).subscribe(seller => {
      this.authService.getUserById(buyerId).subscribe(buyer => {
        this.buyer = buyer;
        this.seller = seller;
      }),
        err => {
          this.toastr.errorToast((err.error.description ? err.error.description : 'Buyer did not load.'));
        };
    }),
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Seller did not load.'));
      };
  }

  makePurchase() {
    let purchaseDone = false;
    // get buyerId
    let buyerId = this.buyer._id;
    // get sellerId
    let sellerId = this.offer._acl.creator;
    // get toGiveBtc, toTakeEur
    let toGiveBtc = this.offer.bitValue;
    let toTakeEur = this.offer.eurValue;

    let buyerBitBalance = this.buyer.bitBalance;
    let buyerEurBalance = this.buyer.eurBalance;

    if (sellerId !== buyerId) {
      if (buyerEurBalance >= toTakeEur) {
        this.toastr.successToast('You have enough EUR');
        buyerBitBalance += toGiveBtc;
        buyerEurBalance -= toTakeEur;

        this.offer.status = "inactive";
        purchaseDone = true;
      } else {
        this.toastr.errorToast("You don't not have enouth EUR Balance");
      }
    } else {
      this.toastr.errorToast("You can't buy from yourself");
    }
    
    if (purchaseDone) {
      // update buyer
      this.authService.updateUserById(buyerBitBalance, buyerEurBalance, this.buyer.iban, this.buyer.wallet, this.buyer.email, this.buyer.name, buyerId).subscribe(buyer => {
        this.toastr.successToast("Transaction made successfuly");
        //this.router.navigate(['/offers']);
      }),
        err => {
          this.toastr.warningToast("Transacton was not made");
        }
      // update offer
      // to do
    }

  }
}
