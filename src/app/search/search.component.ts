import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresult:undefined|product[]
  constructor(private route:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let param=this.route.snapshot.paramMap.get('query');
    
    param &&this.product.searchproduct(param).subscribe((result)=>{
     if(result){
      this.searchresult=result;
     }
    })
  }

}
