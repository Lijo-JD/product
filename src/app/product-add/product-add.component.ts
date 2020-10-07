//Written by Lijo John Daniel, Anjali Das & Jiny Jithesh

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  product = new Product()

  add = new FormGroup({
    product_name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  })

  productAdd() {
    this.product.product_name = this.add.value.product_name
    this.product.price = this.add.value.price
    this.product.quantity = this.add.value.quantity
    this.data.addProduct(this.product).subscribe((data) => {
      console.log(data)
      this.add.reset()
    })
  }

}
