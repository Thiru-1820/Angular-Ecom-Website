import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   popularproducts:undefined|product[];
   trendyproduct:undefined|product[];
  constructor(private product:ProductService) { }
  
  ngOnInit(): void {
    this.product.popularproducts().subscribe((result)=>{
      if(result){
      this.popularproducts=result
      }
    })
    this.product.trendyproduct().subscribe((result)=>{
      if(result){
      this.trendyproduct=result
      }
    })
   
  }
  
  
}
