import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { BusyModule } from 'angular2-busy';
import { ClipboardModule }  from 'ngx-clipboard';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { UiSwitchModule } from 'angular2-ui-switch';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AlertModule } from 'ng2-bootstrap/alert';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { ChartsModule } from 'ng2-charts';
import { Ng2PaginationModule } from 'ng2-pagination';
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
import { PaginationModule } from 'ng2-bootstrap/pagination';
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
        TvTopTenComponent,
        JoinPropertiesPipe,
        MatchesSeason,
        WithRank,
        TvVotingBoxComponent,
        OrderBy 
    ],
    imports: [ 
        routing,
        Ng2PaginationModule,
        BrowserModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
          deps: [Http]
        }),
        Ng2OrderModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        BusyModule,
        ClipboardModule,
        UiSwitchModule,
        DragulaModule,
        SelectModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        DropdownModule.forRoot(),
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
