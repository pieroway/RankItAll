import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Ng2PaginationModule } from 'ng2-pagination';
 
@Component({
  selector: 'search-movie',
  template: require('./moviesearch.component.html'),
  styles: [require('./moviesearch.component.css').toString()]
})

export class MovieSearchComponent implements OnInit {

  title:string = 'Movies';
  query:string;
  movies:any[];

  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number = 20;
  length: number;
  numPages: number = 5;
  startOffset: number = 0;
  endOffset: number;

  constructor(private appService: AppService) { 

  }

  public ngOnInit(): void {
    this.currentPage = 1; 
  }

  public init() {
    if (this.movies) {
        this.currentPage = 1;
        this.length = this.movies.length;
        this.numPages = Math.ceil(this.length / this.itemsPerPage);
        this.startOffset = 0;
        this.endOffset = this.computeEndOffset(0, this.itemsPerPage);
    }
  }  
  
  public computeEndOffset(start: number, itemsPerPage: number) {
      let endOffset = start + itemsPerPage;
      return (endOffset > this.length) ? this.length : endOffset;
  }

  public onPageChange(event:any):void {
    this.currentPage = event.page > 1000 ? 1000 : event.page;  
    this.startOffset = (this.currentPage - 1) * event.itemsPerPage;
    this.endOffset = this.computeEndOffset(this.startOffset, event.itemsPerPage);
    this.search();
  } 

  public onKeyUp() {
    this.init()
    this.search();
  }

  public search(): void {
    if (this.query == '') {
      this.movies = [];
    }
    else {
      this.appService.SearchMovies(this.query, this.currentPage).subscribe(
        res => {
          this.totalItems = res.total_pages;
          this.movies = res.results;
          this.length = (res.total_results > 20000 ? 20000 : res.total_results);
        }
      )
    }
  }
} 