import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productdetails:product|undefined
  productmsg:string|undefined
  constructor(private route:ActivatedRoute,private product:ProductService,
 private router:Router) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');
    productId &&this.product.getproduct(productId).subscribe((result)=>{
    this.productdetails=result
    })
    
  }

  submit(data:product){
   
   if(this.productdetails){
    data.id=this.productdetails.id;
   }
   this.product.updateproduct(data).subscribe((result)=>{
    if(result){
    this.productmsg="**product updated successfully**"
    this.router.navigate(['seller-home'])
    }
    setTimeout(() => {
      this.productmsg=undefined
    }, 3000);
   })
  }

}
