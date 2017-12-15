import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "../../services/toastr-service/toastr.service";
import { RouterAuthService } from "../../services/router-auth-service/router-auth.service";
import { OfferService } from "../../services/offer-service/offer.service";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})

export class EditOfferComponent implements OnInit {
  bitValue: number;
  eurValue: number;
  acceptsBargains: boolean = false;
  status: string = "active";
  itemId: string;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private routerAuth: RouterAuthService,
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService) {
  }

  ngOnInit() {
    if (!this.routerAuth.canAccess()) {
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.itemId = params['id'];
    });

    this.offerService.getOfferById(this.itemId).subscribe(data => {
      this.bitValue = data.bitValue;
      this.eurValue = data.eurValue;
    },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Offer was not loaded. Please try again'));
      });

  }

  submitEditOffer() {
    if (this.bitValue === undefined) {
      this.toastr.errorToast('Please specify Bitcoin value.');
      return;
    }

    if (this.eurValue === undefined) {
      this.toastr.errorToast('Please specify Euro value.');
      return;
    }

    this.offerService.updateOfferById(this.bitValue, this.eurValue, this.acceptsBargains, this.status, this.itemId).subscribe(data => {
      console.log(data);
      this.toastr.successToast('Offer edited.');
      this.router.navigate(['/offers']);
    },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Offer was not updated. Please try again'));
      });

  }
}