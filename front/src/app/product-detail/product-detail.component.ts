import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShareService } from '@ngx-share/core';

import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../entities/product';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comment: string;
  faTwitter = faTwitter;
  faFacebookF = faFacebookF;
  faPinterestP = faPinterestP;
  faWhatsapp = faWhatsapp;
  faVk = faVk;
  faTelegramPlane = faTelegramPlane;
  faLinkedinIn = faLinkedinIn;
  faGooglePlusG = faGooglePlusG;
  logged = false;

  constructor(private route: ActivatedRoute,
              public productService: ProductService,
              private location: Location,
              public share: ShareService,
              private toastr: ToastrService) { }

 getProduct(): void {
    const id1 = +this.route.snapshot.paramMap.get('productId');
  }

  ngOnInit(): void {
    const id1 = +this.route.snapshot.paramMap.get('productId');
    this.productService.getProductsById(+id1).subscribe(perf => {
      this.product = perf;
    });
    const token = localStorage.getItem('token');
    if( token ){
      this.logged = true;
    }
  }

  ShowToast() {
    this.toastr.error('Please, SIGN IN in order to use BAG');
  }

  add() {
    const id1 = +this.route.snapshot.paramMap.get('productId');
    this.productService.addToBasket(id1).subscribe(perf => {
      this.toastr.success('Product successfully idded!');
    });
  }
}
