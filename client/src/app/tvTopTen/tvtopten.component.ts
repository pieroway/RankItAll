import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { VotingService } from '../services/voting.service';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';
import * as _ from 'lodash';

@Component({
  selector: 'tv-top-ten',
  template: require('./tvtopten.component.html'),
  styles: [require('./tvtopten.component.css').toString()]
})

export class TvTopTenComponent implements OnInit {

  public topTen: IShow[] = new Array<IShow>();
  private error: Boolean = false;
  private errorMessage: string = "";

  constructor(
    private appService: AppService,
    private votingService: VotingService) {

  }

  ngOnInit() {
    this.votingService.getTopTen().toPromise().then((response) => {
      if (response.err) {
        this.error = true;
        this.errorMessage = `${response.status} ${response.err.errno}: ${response.err.code}`;
      }
      return response;
    }).then((response) => {
      response.forEach((s) => {
        this.appService.GetTvDetails(s.showid).then(show => {
          show.Votes = s.votes;
          this.topTen.push(show);
        });
      })
    });
  }
}