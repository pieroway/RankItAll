import { Component, Input } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { VotingService } from '../../services/voting.service';
import { AuthService } from '../../services/auth.service';
import { PipeTransform, Pipe } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'talk-back',
    template: require('./talkback.component.html'),
    styles: [require('./talkback.component.css').toString()]
})

export class TalkbackComponent {

    @Input() public showId: number;
    @Input() public isCondensed: boolean;
    
    public isLoading: boolean;
    public comment: string;
    public comments: string[] = new Array<string>();
    public votingServiceError: boolean = false;
    public errorMessage: string;

    constructor(
        private votingService: VotingService,
        private auth: AuthService) {

    }

    ngOnInit() {
        console.log('ngOnInit()');
        this.getComments(); 
    }

    ngAfterViewInit() {
        console.log('ngAfterInit()');
        
    }

    submit() {
        if(this.comment) {
            this.saveComment();
        }
        this.comment = undefined; 
    }

    saveComment(){
        let _that = this;
        let username = this.auth.userProfile ? this.auth.userProfile.nickname : 'Anonymous';
        this.votingService.saveComment(this.showId, this.comment, username).subscribe(
            data => {
                if (data.err) {
                    _that.votingServiceError = true;
                    _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                } else {
                    _that.votingServiceError = false;
                    _that.getComments();
                }
            },
            err => {
                _that.votingServiceError = true;
                _that.errorMessage = 'Comment not saved.';
            }
        );
    }

    getComments() {
        console.log('getComments');
        this.isLoading = true;
        let _that = this;
        this.votingService.getComments(this.showId).subscribe(
            data => {
                if (data.err) {
                    _that.votingServiceError = true;
                    _that.errorMessage = `${data.status} ${data.err.errno}: ${data.err.code}`;
                } else {
                    _that.votingServiceError = false;
                    _that.comments = data.reverse(); 
                }
                _that.isLoading = false;
            },
            err => {
                _that.votingServiceError = true;
                _that.errorMessage = 'Comments not available.';
                _that.isLoading = false;
            }
        );
    }

}

