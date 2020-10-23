import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface PRODUCTDATA {
  name: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) { }
  productDetail: PRODUCTDATA;

  getData = () => {
    return this.http.get<PRODUCTDATA>('http://localhost:3030')
  }
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': 'http://localhost:4200',
  //     'Access-Control-Allow-Credentials': 'true'
  //   })
  // };
  sendData = (data) => {
    return this.http.post('http://localhost:3030', data )
  }

  getAProduct = (i) => {
    return this.http.get<PRODUCTDATA>('http://localhost:3030/'+ i)
  }
}
