import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMsg: string | undefined;
  showForm: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    const data: product = form.value;
    this.productService.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMsg = "Product is added successfully";
        this.showForm = false;

        setTimeout(() => {
          this.showForm = true;
          this.addProductMsg = undefined;
          form.resetForm();
        }, 3000);
      }
    });
  }
}
