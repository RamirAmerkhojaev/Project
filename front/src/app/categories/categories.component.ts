import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Photo, photos } from '../photos';
import {CategoryService} from '../services/category.service';
import {Category} from '../entities/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  p: Photo = {} as any;
  photos: Photo[];
  categories: Category[];
  imageClicked = true;
  constructor(public categoryService: CategoryService) { }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe(perf => {
      this.categories = perf;
    });

}
  private getPhotos(): void {
    of(photos).subscribe(photo => this.photos = photo);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPhotos();
  }


  closeForm() {
    this.imageClicked = !this.imageClicked;
  }

  showInstagram(photo) {
    this.p = photo;
    this.imageClicked = !this.imageClicked;
  }

}
