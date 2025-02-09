import { Component, OnInit } from '@angular/core';
import { cart, cartpricesummary, product } from '../data-type';
import { ProductService } from '../service/product.service';

import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartdata: cart[] | undefined
  summmary: cartpricesummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
 cart=faShoppingCart
  constructor(private product: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.product.currentcart().subscribe((result) => {
      if (result) {
        this.cartdata = result
        result.forEach((item) => {
          if (item.quantity) {
            this.summmary.price = this.summmary.price + (+item.price * +item.quantity)
          }
        })
        this.summmary.discount = this.summmary.price / 10
        this.summmary.delivery = 40
        this.summmary.tax = this.summmary.price / 10
        this.summmary.total = this.summmary.price + this.summmary.delivery -(- this.summmary.tax) - this.summmary.discount

      }
    })
    
  }
  
  
  
  removetocart(id:string|undefined){
    this.resetSummary()
    id&&this.product.removetocart(id).subscribe((result)=>{
      let user=localStorage.getItem('user')
      let userid=user&&JSON.parse(user)[0].id
      this.product.getcartlist(userid)
      this.product.currentcart().subscribe((result) => {
        if (result) {
          this.cartdata = result
          result.forEach((item) => {
            if (item.quantity) {
              this.summmary.price = this.summmary.price + (+item.price * +item.quantity)
            }
          })
          this.summmary.discount = this.summmary.price / 10
          this.summmary.delivery = 40
          this.summmary.tax = this.summmary.price / 10
          this.summmary.total = this.summmary.price + this.summmary.delivery -(- this.summmary.tax) - this.summmary.discount
  
        }else{
           this.cartdata=undefined
          this.summmary.price=0
          this.summmary.discount = 0
          this.summmary.delivery = 0
          this.summmary.tax = 0
          this.summmary.total = 0
        }
      })
      
      
    })
    if(this.cartdata?.length){
      this.router.navigate(['/'])
    }
   
  }
  resetSummary(): void {
    this.summmary.price = 0;
    this.summmary.discount = 0;
    this.summmary.delivery = 0;
    this.summmary.tax = 0;
    this.summmary.total = 0;
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }

}
