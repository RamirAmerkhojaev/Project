import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {CategoryService} from '../services/category.service';
import {Product} from '../entities/product';
import {Category} from '../entities/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public categoryService: CategoryService,
              private route: ActivatedRoute,
              private location: Location,
              public router: Router) { }

  products: Product[];
  cat: Category;
  categories: Category[];
  id: number;

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.categoryService.getProductsByCategory(+categoryId).subscribe(perf => {
      this.products  = perf;
      this.id = +categoryId;
    });
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(perf => {
      this.categories = perf;
    });
  }
}
