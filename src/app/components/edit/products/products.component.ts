import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = []
constructor(
  private readonly productService: ProductsService
){
  this.loadProducts()
}
loadProducts(){
  this.productService.getProducts().subscribe({
    next: (data: any) => {
      console.log(data)
      this.products=data
    },
    error: (error: any) => {
      console.error(error)
    }
  })
}
editProduct(product:any){
  product.price += 0.5
  this.productService.editProduct(product).subscribe({
    next: (data: any) => {
      console.log(data)
      this.products=[]
      this.loadProducts()
    },
    error: (error: any) => {
      console.error(error)
    }
  })
}
}
