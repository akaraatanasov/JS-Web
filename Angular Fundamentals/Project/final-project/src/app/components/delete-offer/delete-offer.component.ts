import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "../../services/toastr-service/toastr.service";
import { RouterAuthService } from "../../services/router-auth-service/router-auth.service";
import { OfferService } from "../../services/offer-service/offer.service";

@Component({
  selector: 'app-delete-offer',
  template: ``
})

export class DeleteOfferComponent implements OnInit {
  orderId: string;

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
      this.orderId = params['id'];
    });

    this.offerService.deleteOfferById(this.orderId).subscribe(data => {
      this.toastr.successToast('Offer deleted.');
      this.router.navigate(['/offers']);
    },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });
  }
}
