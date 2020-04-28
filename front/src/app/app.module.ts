import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpClientJsonpModule} from '@angular/common/http';
import { ShareModule } from '@ngx-share/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterService } from './services/register.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { from } from 'rxjs';
import { BagComponent } from './bag/bag.component';
import { CommentsComponent } from './comments/comments.component';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './AuthInterceptor';


const routes: Routes = [
  {path: '', redirectTo: '/categories', pathMatch: 'full'},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:categoryId/products', component: ProductsComponent},
  {path: 'categories/:categoryId/products/:productId/description', component: ProductDetailComponent},
  {path: 'categories/:bag', component: BagComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    BagComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FontAwesomeModule,
    ShareModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true
    }),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule],
    providers: 
    [
        RegisterService, <ClassProvider> {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
