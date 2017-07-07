import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { AppService } from '../services/app.service';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';
import { VotingService } from '../services/voting.service';

@Component({
    selector: 'tv-seasons',
    template: require('./tvseasons.component.html'),
    styles: [require('./tvseasons.component.css').toString()]
})

export class TvSeasonsComponent implements OnChanges {

    @Input() public show: IShow;
    @Input() public tabChanged: boolean;

    public sortByKey: string = 'Rank';
    private isLoaded: boolean = true;
    private votingServiceError: boolean = false;
    private errorMessage: string;

    constructor(
        private appService: AppService,
        private votingService: VotingService) {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            var chgProp = changes[propName];
            console.log(!chgProp.isFirstChange());
            if (!chgProp.isFirstChange() && propName === "tabChanged") {
                this.getLocalEpisodes();
            }
        }
    }

    public getLocalEpisodes() {
        console.log("getLocalEpisodes()");
        if (!this.show) return;
        this.votingService.getEpisodes(this.show.Id).subscribe(
            data => {
                if (data.err) {
                    // console.log(`${data.status} ${data.err.errno}: ${data.err.code}`);
                } else {
                    if (data.length > 0) {
                        data.forEach((episode) => {
                            var ep: IEpisode = this.show.AllEpisodes[this.show.AllEpisodes.findIndex(item => item.LongEpisodeId === episode['id'])];
                            if(ep) {
                                ep.Wins = episode['wins'];
                                ep.Losses = episode['losses'];
                                ep.Name = episode['name'] || ep.Name;
                                ep.Overview = episode['overview'] || ep.Overview;
                                ep.Rank = episode['rank'];
                            }
                        });
                    }
                }
            }
        );
    }

    private sortBy(key: string) {
        this.sortByKey = key;
        console.log(`tvseasons sortByKey: ${this.sortByKey}`);
    }

}