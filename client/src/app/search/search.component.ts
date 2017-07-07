import { Component, OnInit } from '@angular/core';
import { MovieSearchComponent } from '../moviesearch/moviesearch.component';
import { TvSearchComponent } from '../tvsearch/tvsearch.component';

@Component({
  selector: 'search',
  template: require('./search.component.html'),
  styles: [require('./search.component.css').toString()]
})

export class SearchComponent implements OnInit {

  title: string = 'Search';
  query: string;
  movies: any[];

  constructor() {
  };

  public ngOnInit(): void {
  }

}  