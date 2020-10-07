//Written by Lijo John Daniel, Anjali Das & Jiny Jithesh

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Price } from '../price';
import { Product } from '../product';
import { Purchase } from '../purchase';
import { User } from '../user';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getData()
    this.getUser()
  }

  @Input() email
  @Input() ownerID
  @Output() priceToOwner = new EventEmitter<Price>();

  products: Product[] = []
  product: Product = new Product()
  price: Price = new Price()
  purchase: Purchase = new Purchase()
  user: User = new User()

  buy = new FormGroup({
    product_name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    referralID: new FormControl('', [Validators.required, this.referralValidator])
  })

  onBuy(product: Product) {
    this.purchase.product_name = this.buy.value.product_name
    this.purchase.price = this.buy.value.price
    this.purchase.quantity = this.buy.value.quantity
    this.purchase.referralID = this.buy.value.referralID
    this.purchase.userID = this.user._id
    this.data.setPurchase(this.purchase).subscribe((data) => {
      if (data) {
        let amount = 0.1 * parseInt(this.purchase.price)
        this.price.amount = amount
        this.price.id = this.ownerID
        this.priceToOwner.emit(this.price)
        this.product._id = product._id
        this.product.product_name = product.product_name
        this.product.price = product.price
        let quantity = product.quantity - parseInt(this.purchase.quantity)
        this.product.quantity = quantity
        this.data.editProduct(this.product).subscribe((data) => {
          console.log(data)
        })
      } else {
        console.log(data)
      }

    })
  }

  onBuyProd(product: Product) {
    this.product = product
  }

  getData() {
    this.data.getProducts().subscribe((data: Product[]) => {
      this.products = data
    })
  }

  getUser() {
    this.data.getUser(this.email).subscribe((data: User) => {
      this.user = data
    })
  }

  referralValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (
      control !== null &&
      (control.value != null || control.value != undefined)
    ) {
      if (control.root.get('referralID') != null) {
        let referralControl = null
        this.data.getUserFromReferral(control.value).subscribe((data) => {
          referralControl = data
        })
        if (referralControl === null) {
          return { referralID: true };
        }
      }
      return null;
    }
  }

}
