import { Component, OnInit, Input } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../services/comment.service';
import {Comment} from '../entities/comment';
import {HeaderComponent} from '../header/header.component'
import {Product} from '../entities/product';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {

  constructor(public commentService: CommentService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              ) { }



  comment: string;
  comments: Comment[];
  update = false;
  text = this.comment;
  newComment: string;
  public logged = false;
 products: Product[];
 

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('productId');
    const categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.commentService.getComments(categoryId, productId).subscribe(perf => {
      this.comments = perf;
    });

    const token = localStorage.getItem('token');
    if( token ){
      this.logged = true;
    }
  }


  addComment() {
    const prdId = +this.route.snapshot.paramMap.get('productId');
    const ctdId = +this.route.snapshot.paramMap.get('categoryId');
    this.commentService.addComment(prdId, this.comment).subscribe(perf => {
      this.toastr.success('Comment successfully added!');
      this.comment = '';
      this.commentService.getComments(ctdId, prdId).subscribe(res => {
        this.comments = res;
      });
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(perf => {
      this.comments = this.comments.filter(e => e.id !== id);
    });
  }


  updateComment(id: number) {
    this.update = true;
  }

  saveComment(id: number) {
    const productId = +this.route.snapshot.paramMap.get('productId');
    const categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.commentService.updateComment(id, this.text, productId).subscribe( perf => {
      console.log(id, this.text);
      this.commentService.getComments(categoryId, productId).subscribe(res => {
        this.comments = res;
      });
    });
    this.update = false;
  }

   showToast() {
    this.toastr.error('Authorization required');
  }
}
