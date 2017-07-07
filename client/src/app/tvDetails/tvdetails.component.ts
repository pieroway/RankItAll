import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { VotingService } from '../services/voting.service';
import { ActivatedRoute } from '@angular/router';
import { TvSeasonComponent } from '../tvseason/tvseason.component';
import { TalkbackComponent } from '../talkback/talkback.component';
import { TvVotingBoxComponent } from '../tvvotingbox/tvvotingbox.component';
import { PipeTransform, Pipe } from '@angular/core';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';
import * as _ from 'lodash';

@Component({
  selector: 'tv-details',
  template: require('./tvdetails.component.html'),
  styles: [require('./tvdetails.component.css').toString()]
})

export class TvDetailsComponent implements OnInit {

  private show: IShow;
  private id: number;
  private sub: any;
  private condensed: boolean = false;
  private isLoaded: boolean = false;
  private votingServiceError: boolean = false;
  private errorMessage: string;
  private isCondensed: boolean = false; 
  private tabChanged: boolean = false;

  constructor(private appService: AppService,
              private votingService: VotingService, 
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      var __this = this;
      this.isLoaded = false;
      this.getShowDetails()
        .then((res) => {
          this.getEpisodes()
        })
        .then((res) => {
          this.getVotes()
        })
        .then(()=>{
          this.isLoaded = true;
        });
    });
  }
 
  public tabSelected() {
    // toggle value to initiate on change in child component
    this.tabChanged = !this.tabChanged; 
  }

  public getShowDetails(): Promise<IShow> {
    return this.appService.GetTvDetails(this.id)
      .then(res => {
        this.show = res;
        return res;
      });
  }
  
  public getVotes(): void {
    this.votingService.getVotes(this.show.Id).subscribe(
        data => {
            if (data.err) {
                this.votingServiceError = true;
                this.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
            } else {
                this.show.Votes = data[0].votes;
            }
        },
        err => {
            this.votingServiceError = true;
            this.errorMessage = 'Err: Unable to load data.';
        }
    );
  }

  public getEpisodes(): void {
    let __this = this;
    this.show.AllEpisodes = [];
    var promises = this.show.Seasons.map((s) => {
      this.appService.GetTvSeasonAsPromise(this.id, s.SeasonNumber - 1)
        .then(res => {
          __this.show.AllEpisodes = __this.show.AllEpisodes.concat(res.Episodes);
        })
    }); 
  }
 
  private toggleBlock(section: string) : void {
    if (section==='top') { 
      this.isCondensed = !this.isCondensed;
    } 
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }

}