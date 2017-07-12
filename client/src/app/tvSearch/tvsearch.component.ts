import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-tv',
  template: require('./tvsearch.component.html'),
  styles: [require('./tvsearch.component.css').toString()]
})

export class TvSearchComponent implements OnInit {

  private title: string = 'Television';
  private query: string;
  private shows: any[];

  private currentPage: number;
  private totalItems: number;
  private totalPages: number;
  private itemsPerPage: number = 20;
  private length: number;
  private numPages: number = 5;
  private startOffset: number = 0;
  private endOffset: number;
  private sub: any;

  constructor(private appService: AppService, 
              private route: ActivatedRoute,
              private router: Router) {
  }
  
  public ngOnInit() : void {
    this.currentPage = 1; 
  }
 
  public init() : void {
    if (this.shows) {
        this.currentPage = 1;
        this.length = this.shows.length;
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
      this.shows = [];
    }
    else {
      this.appService.SearchTelevision(this.query, this.currentPage).subscribe(
        data => {
          this.totalItems = data.total_pages;
          this.shows = data.results;
          this.length = (data.total_results > 20000 ? 20000 : data.total_results);
        },
        err => {
            alert(err);
        }
      )
    }

  }
} 