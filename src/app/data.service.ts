//Written by Lijo John Daniel

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Purchase } from './purchase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('http://localhost:3000/products')
  }

  addProduct(product: Product) {
    return this.http.post('http://localhost:3000/addProduct', product)
  }

  editProduct(product: Product) {
    return this.http.put('http://localhost:3000/editProduct', product)
  }

  getUser(email: string) {
    return this.http.post('http://localhost:3000/getUser', email)
  }

  getUserFromReferral(referralID: string) {
    return this.http.post('http://localhost:3000/getUserFromReferral', referralID)
  }

  setPurchase(purchase: Purchase) {
    return this.http.post('http://localhost:3000/purchase', purchase)
  }
}
