import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import {Category} from '../entities/category';
import {CategoryService} from '../services/category.service';
import {RegisterService} from '../services/register.service';
import {IAuthResponse, User} from '../entities/register';
import {Product} from '../entities/product';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {

  public isClicked = true;
  public menuOpened = true;
  public isCreate = true;
  public categories: Category[];
  public country: string;
  public registered = false;
  public logged : boolean = false;
  public username = '';
  public password = '';
  public email = '';
  user = {} as User;
  receivedUser: User;
  done = false;
  id: number;
  products: Product[];
  toastr: ToastrService;

  constructor(private categoryService: CategoryService,
              private register: RegisterService) { }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe(perf => {
      this.categories = perf;
    });
  }


  ngOnInit(): void {
    this.registered = false;
    let token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    this.getCategories();
  }


  signup(user: User) {
    this.register.signup(user)
      .subscribe(
        (res => { this.user = user, this.logged = true, location.reload() }),
        error => console.log(error)
      );
  }

  login() {
    this.register.login(this.username, this.password)
      .subscribe(res => {

        localStorage.setItem('token', res.token);

        this.logged = true;
        this.username = '';
        this.password = '';
        location.reload()
      });
  }

  logout() {
    localStorage.clear();
    this.logged = false;
    location.reload()
  }
showToast() {
    this.toastr.error('Authorization required');
  }

  showForm() {
    this.isClicked = !this.isClicked;
  }

  closeForm() {
    this.isClicked = !this.isClicked;
  }

  closeCreateForm() {
    this.isCreate = !this.isCreate;
  }

  showMenu() {
    this.menuOpened = !this.menuOpened;
  }

  showCreateForm() {
    this.isCreate = !this.isCreate;
    this.isClicked = !this.isClicked;
  }
}
