import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AppService } from '../services/app.service';
import { VotingService } from '../services/voting.service';
import { ActivatedRoute } from '@angular/router';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';
import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'tv-episode',
    template: require('./tvepisode.component.html'),
    styles: [require('./tvepisode.component.css').toString()] 
})

export class TvEpisodeComponent implements OnInit {

    @Input() public episode: IEpisode;
 
    public editing: boolean = false;
    public overview: string;
    public error: Boolean = false;
    public errorMessage: string = "";
    public isSaving: boolean = false; 
    public showSaved: boolean = false; 

    constructor(private appService: AppService,
                private votingService: VotingService) { }

    ngOnInit() { 
        this.overview = this.episode.Overview;
    }

    public save() {
        this.overview = this.episode.Overview;
        let _that = this;
        // this.isSaving = true;
        // showId: number, episodeId: number, longEpisodeId: string, episodeOverview: string
        this.votingService.saveEpisodeOverview(this.episode.ShowId, this.episode.Id, this.episode.LongEpisodeId, this.episode.Overview).subscribe(
            data => {
                if (data.err) {
                    _that.error = true;
                    _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                } else {
                    // this.isSaving = false;
                    // this.showSaved = true;
                    // setTimeout(() => {  
                    //     this.showSaved = false;
                    // }, 2000);   
                }
            }
        );
    }

    public cancel() {
        this.episode.Overview = this.overview;
    }
} 