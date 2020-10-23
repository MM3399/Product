import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private requests: RequestsService) { }


  productDetail;
  ngOnInit(): void {
    this.productDetail = this.requests.productDetail
  }

}
