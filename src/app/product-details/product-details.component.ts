import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
   quantity=1
   removecart=false
   cartdata:product|undefined
  constructor(private route:ActivatedRoute,private product:ProductService) { }
  productdetails:undefined|product
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    id && this.product.getproduct(id).subscribe
    ((result)=>{
     if(result){
      this.productdetails=result
      let cartdata=localStorage.getItem('localcart')
      if(id&&cartdata){
       let item=JSON.parse(cartdata)
       item=item.filter((item:product)=>id===item.id.toString());
       if(item.length){
       this.removecart=true}
      }
      else{
        this.removecart=false
      }
     }
     let user=localStorage.getItem('user')
     if(user){
     let userid=user&&JSON.parse(user)[0].id
     this.product.getcartlist(userid)
     this.product.cartdata.subscribe((result)=>{
     let  item=result.filter((item:product)=>id?.toString()===item.productid?.toString());
     if(item.length){
      this.cartdata=item[0]
      this.removecart=true
     }
     })
    }

    })
  }
  handle(val:string){
    if(this.quantity<20 && val==='plus'){
      this.quantity+=1
    }
    if(this.quantity>1 && val==='min'){
      this.quantity-=1
    }
  }
  addtocart(){
    if(this.productdetails){
      this.productdetails.quantity=this.quantity
      if(!localStorage.getItem('user')){
        this.product.localAddcart(this.productdetails)
        this.removecart=true
    }
    else{
      let user=localStorage.getItem('user')
      let userid=user&&JSON.parse(user)[0].id
      let cartdata:cart={
        ...this.productdetails,
        userid,
        productid:this.productdetails.id

      }
      delete cartdata.id
      this.product.addtocart(cartdata).subscribe((result)=>{
        if(result){
          this.product.getcartlist(userid)
          this.removecart=true
        }
      })
    }
    }
  }
  removetocart(id:string){
    if(!localStorage.getItem('user')){
   this.product.removeitemfromcart(id)
   this.removecart=false }
   else{
    this.cartdata &&this.product.removetocart(this.cartdata.id).subscribe((result)=>{
      let user=localStorage.getItem('user')
      let userid=user&&JSON.parse(user)[0].id
      this.product.getcartlist(userid)
      this.removecart=false
    })
   }
  }
 
}
