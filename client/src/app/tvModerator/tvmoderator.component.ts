import { Component, Input } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { VotingService } from '../../services/voting.service';
import { AuthService } from '../../services/auth.service';
import { PipeTransform, Pipe } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'tv-moderation',
    template: require('./tvmoderator.component.html'),
    styles: [require('./tvmoderator.component.css').toString()]
})

export class TvModeratorComponent {

    @Input() public showId: number;
 
    public isLoading: boolean; 
    public userEmail: string;
    public isModerator: boolean = false; 
    public votingServiceError: boolean = false;
    public errorMessage: string;

    constructor(
        private votingService: VotingService,
        private auth: AuthService) {

    }

    ngOnInit() { 
        if(this.auth.userProfile && this.auth.isAuthenticated()) {
            this.userEmail = this.auth.isAuthenticated ? this.auth.userProfile.name : "";
            console.log(`userEmail = ${this.auth.userProfile.name}`);
            if (this.userEmail) {
                this.getModerator();
            } else  {
                this.isModerator = false;
            }
        } 
    }
 
    addModerator(){
        if(this.auth.isAuthenticated()) {
            let _that = this;
            this.votingService.addModerator(this.showId, this.userEmail).subscribe(
                data => {
                    if (data.err) {
                        _that.votingServiceError = true;
                        _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                        _that.isModerator = false;
                    } else {
                        _that.votingServiceError = false;
                        _that.getModerator();
                    }
                },
                err => {
                    _that.votingServiceError = true;
                    _that.errorMessage = 'Could not delete moderator.';
                }
            );
        }
    }

    deleteModerator(){
        let _that = this;
        this.votingService.deleteModerator(this.showId).subscribe(
            data => {
                if (data.err) {
                    _that.votingServiceError = true;
                    _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                    _that.isModerator = false;
                } else {
                    _that.votingServiceError = false;
                    _that.isModerator = false ;
                }
            },
            err => {
                _that.votingServiceError = true;
                _that.errorMessage = 'Could not delete moderator.';
            }
        );
    }

    getModerator() : void {
        if(this.auth.isAuthenticated()) {
            let _that = this;
            this.votingService.getModerator(this.showId).subscribe(
                data => {
                    if (data.err) {
                        _that.votingServiceError = true;
                        _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                        _that.isModerator = false;
                    } else {
                        _that.votingServiceError = false;
                        console.log(data);  
                        _that.isModerator = data[0]['email'] === _that.userEmail ? true : false ;
                    }
                },
                err => {
                    _that.votingServiceError = true;
                    _that.errorMessage = 'Could not get moderator.';
                }
            );
        }
    }

}

