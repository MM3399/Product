import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../services/requests.service';
import { Router } from '@angular/router';

interface PRODUCTDATA {
  name: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {

  productData = {
    name: '',
    price: '',
    description: '',
    password: ''
  }
  file;
  formData: FormData = new FormData();
  products;

  constructor(private requests: RequestsService, private router:Router) { }

  ngOnInit(): void {
    this.requests.getData().subscribe(data=>{
      this.products = data as PRODUCTDATA
    })

  }

  //Sending POST request to save data and updating our page as the new product has been saved
  sendFormData = ()=>{
    Object.keys(this.productData).forEach(key => {
      this.formData.append(key, this.productData[key]);
    });
    this.requests.sendData(this.formData).subscribe(data=>{
      console.log(data);
      Object.keys(this.productData).forEach(key => {
        this.formData.delete(key);
      });
      this.formData.delete("image");
      this.requests.getData().subscribe(data => {
        this.products = data as PRODUCTDATA
      })
    })
    this.productData = {
      name: '',
      price: '',
      description: '',
      password: ''
    }
  }
  handleImageFileInput=(files: FileList)=>{
    this.file = files[0];
    this.formData.append('image', this.file)
  }
  productDetail = (i)=>{
    this.requests.getAProduct(i).subscribe(data=>{
      this.requests.productDetail = data
      this.router.navigate(['/productDetail'])
    });

  }

  sortByPrice = ()=>{
    this.products.sort((a,b)=>a.price>b.price?1: (a.price<b.price)? -1 : 0)
    console.log(this.products)
  }

  sortByName = ()=>{
    this.products.sort((a,b)=>a.name>b.name ? 1 : (a.name<b.name)? -1 : 0)
  }

}
