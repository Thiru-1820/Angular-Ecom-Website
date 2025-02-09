import { Component, OnInit } from '@angular/core';

import { ProductService } from '../service/product.service';
import {  cart, order } from '../data-type';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  tot:number|undefined
  cartdata:cart[]|undefined
  ord:string|undefined
  constructor(private product:ProductService,private router:Router) { }
  out=faCreditCard
  ngOnInit(): void {
    this.product.currentcart().subscribe((result) => {
      if (result) {
        let price=0
        this.cartdata=result
        result.forEach((item) => {
          if (item.quantity) {
          price=price + (+item.price * +item.quantity)
          }
        })
       this.tot=price+40-(-price/10)-price/10

      }
    })
    
  }
  orderdata(data:{email:string,address:string,contact:number}){

    let user=localStorage.getItem('user')
    let userid=user&&JSON.parse(user)[0].id
    if(this.tot){
     let orderdata:order={
        ...data,
        totalprice:this.tot,
        userid,
        id:undefined
      }
      this.cartdata?.forEach((item)=>{
       setTimeout(() => {
        item.id&&this.product.deletecartitems(item.id)
       }, 700);
      })
      this.product.ordernow(orderdata).subscribe((result)=>{
        if(result){
          this.ord="Order has been placed"
         setTimeout(() => {
          this.ord=undefined
          this.router.navigate(['my-orders'])
         }, 4000);
        
        }
      })
    }
  }
  

}
