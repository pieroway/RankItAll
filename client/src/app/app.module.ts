import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule } from '@angular/http'; 
import { BusyModule } from 'angular2-busy'; 
import { DragulaModule } from 'ng-dragula/ng-dragula';
import { UiSwitchModule } from 'angular2-ui-switch';
import { SelectModule } from 'ng-select';
import { ModalModule } from 'ng-bootstrap/modal';
import { AlertModule } from 'ng-bootstrap/alert';
import { TooltipModule } from 'ng-bootstrap/tooltip';
import { TabsModule } from 'ng-bootstrap/tabs';
// import { BsDropdownModule } from 'ng-bootstrap/dropdown';
import { TypeaheadModule } from 'ng-bootstrap/typeahead';
import { ButtonsModule } from 'ng-bootstrap/buttons';
import { AccordionModule } from 'ng-bootstrap/accordion';
import { ChartsModule } from 'ng-charts';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieSearchComponent } from './moviesearch/moviesearch.component';
import { TvSearchComponent } from './tvsearch/tvsearch.component'; 
import { TvDetailsComponent } from './tvdetails/tvdetails.component';
import { TvSeasonComponent } from './tvseason/tvseason.component';
import { TvSeasonsComponent } from './tvseasons/tvseasons.component';
import { TvVotingBoxComponent } from './tvvotingbox/tvvotingbox.component';
import { TvEpisodeComponent } from './tvepisode/tvepisode.component';
import { TvTopTenComponent } from './tvtopten/tvtopten.component';
import { TalkbackComponent } from './talkback/talkback.component';
import { TvModeratorComponent } from './tvmoderator/tvmoderator.component';
import { PaginationModule } from 'ng-bootstrap';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { routing } from './app.routing';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';
import { VotingService } from '../services/voting.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { JoinPropertiesPipe, MatchesSeason, OrderBy, WithRank } from './app.pipes';

@NgModule({
    declarations: [
        TalkbackComponent,
        AppComponent,
        SearchComponent,
        MovieSearchComponent,
        TvSearchComponent, 
        TvDetailsComponent,
        TvSeasonsComponent,
        TvSeasonComponent,
        TvEpisodeComponent,
        TvModeratorComponent,
        TvTopTenComponent,
        JoinPropertiesPipe,
        MatchesSeason,
        WithRank,
        TvVotingBoxComponent,
        OrderBy 
    ],
    imports: [ 
        routing,
        BrowserModule,
        Ng2OrderModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        BusyModule,
        UiSwitchModule,
        DragulaModule,
        SelectModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
        ButtonsModule.forRoot(),
        AccordionModule.forRoot(),
        ChartsModule,
        Angular2FontawesomeModule
    ],
    exports: [],
    providers: [ AppService, VotingService, AuthService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
