import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from '../../../app.routes';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';



@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.css']
})
export class CategoryTabComponent implements OnInit {
  products: any;
  id = "-LTm18I8IWTBnFbxHJGI";

  checkChild = "cat_id";
  error = false;
  currentProduct = new Array();
  coutId: string;

  constructor(private actRoute: ActivatedRoute, private productService: ProductService) {
    console.log(this.actRoute.snapshot.queryParamMap.get('cOut'))
    this.coutId = this.actRoute.snapshot.queryParamMap.get('cOut');
    if (this.coutId) {
      localStorage.removeItem('orderData2');

    }
  }
  ngOnInit() {
    this.actRoute.queryParams.subscribe(quer => {
      if (quer.categoryId == undefined) {
        this.id = "-LTm18I8IWTBnFbxHJGI";
      } else {
        this.id = quer.categoryId;
      }
      this.getData();
    });
  }

  getData() {

    this.productService.getProductbycat(this.checkChild, this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(products => {
      this.products = products;
      console.log(this.products);
    });

  }

}




