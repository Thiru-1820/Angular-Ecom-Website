import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productlist:undefined|product[]
  productmsg:string|undefined
  icon=faTrash
  edit=faEdit
  constructor(private product:ProductService) { }

  ngOnInit(): void {
  this.list()
  }
  deleteproduct(id:string){
    this.product.deleteproduct(id).subscribe((result)=>{
     if(result){
      this.productmsg="product deleted successfully"
      this.list()
     }
     setTimeout(() => {
      this.productmsg=undefined
     }, 3000);
    })
  }
list(){
  this.product.productlist().subscribe((result)=>{
    if(result){
    this.productlist=result;}
});
}
}
