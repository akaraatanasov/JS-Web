import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from "../../services/offer-service/offer.service";
import { AuthService } from "../../services/auth-service/auth.service";
import { ToastrService } from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog;
  seller;
  buyer;
  permissions: boolean;
  constructor(private router: Router, private offerService: OfferService, private toastr: ToastrService, private authService: AuthService) {
    router.events.subscribe((val) => {
      this.permissions = localStorage.getItem('authtoken') !== null;
    });
  }

  ngOnInit() {
    this.offerService.getOffers().subscribe(data => {
      this.catalog = data.sort((a, b) => a._kmd.lmt <= b._kmd.lmt);
      //console.log(this.catalog)
      this.permissions = localStorage.getItem('authtoken') !== null;
      //console.log(this.permissions)
    },
      err => {
        this.catalog = [];
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });
  }
}
