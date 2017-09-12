import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { VotingService } from '../../services/voting.service';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';
import { AlertModule } from 'ng2-bootstrap/alert';

@Component({
    selector: 'tv-voting-box',
    template: require('./tvvotingbox.component.html'),
    styles: [require('./tvvotingbox.component.css').toString()]
})

export class TvVotingBoxComponent implements OnInit {

    @Input() public show: IShow;
 
    private leftRandom: IEpisode;
    private rightRandom: IEpisode;
    private leftRandomId: string;
    private rightRandomId: string;
    private votingServiceError: Boolean = false;
    private errorMessage: string = "";
    public votes: number;

    constructor(
        private appService: AppService,
        private votingService: VotingService) {
    }

    public ngOnInit(): void {
        if (this.show && this.show.AllEpisodes.length > 0) {
            this.getRandomPair();
        }
    }

    public vote(win: string, lose: string) {
        this.saveVote(win, lose);
    }

    public saveVote(winId: string, loseId: string): void {
        let _that = this;
        this.votingService.saveVote(this.show.Id, winId, loseId).subscribe(
            data => {
                if (data.err) {
                    _that.votingServiceError = true;
                    _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                } else {
                    _that.votingServiceError = false;
                    _that.show.Votes = data[2]["0"].votes;
                    _that.getRandomPair();
                }
            },
            err => {
                _that.votingServiceError = true;
                _that.errorMessage = 'Unable to save vote. Please try again later.';
            }
        );
    }

    public cantDecide(event) {
        this.getRandomPair();
    }

    private resetErrors() {
        this.votingServiceError = false;
        this.errorMessage = "";
    }

    private getRandomPair(): void {
        this.resetErrors();
        if (this.show.AllEpisodes.length > 2) {
            let leftIndex: number;
            let rightIndex: number;
            do {
                leftIndex = Math.floor((Math.random() * this.show.AllEpisodes.length - 1) + 1);
                rightIndex = Math.floor((Math.random() * this.show.AllEpisodes.length - 1) + 1);
                this.leftRandom = this.show.AllEpisodes[leftIndex];
                this.rightRandom = this.show.AllEpisodes[rightIndex];
                this.leftRandomId = `S${this.leftRandom.SeasonNumber}N${this.leftRandom.EpisodeNumber}`;
                this.rightRandomId = `S${this.rightRandom.SeasonNumber}N${this.rightRandom.EpisodeNumber}`;
            } while ((leftIndex === rightIndex) || (this.leftRandom.Overview === "") || (this.rightRandom.Overview === ""));
        }
    }

} 