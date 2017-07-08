import { Injectable } from '@angular/core';
import { Jsonp } from "@angular/http";
import { VotingService } from './voting.service';
import { IShow, ISeason, IEpisode, IGenre } from '../app/app.interface';
import 'rxjs/Rx';
import { Http, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class AppService {

    private imagesBaseUrl: string;
    private baseUrl: string;
    private apiKey: string;
    private seasons = [];
    private readonly BASE_URL: string = 'https://api.themoviedb.org';

    private readonly REQUEST_HEADERS: Headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    private readonly REQUEST_OPTIONS: RequestOptionsArgs = new RequestOptions({ headers: this.REQUEST_HEADERS });

    /* Setup api */
    constructor(private _jsonp: Jsonp,
                private http: Http,
                private votingService: VotingService) {

        this.apiKey = 'aa976b9942bb793a62f01193808bec90';
        this.baseUrl = 'https://api.themoviedb.org';
        this.imagesBaseUrl = 'http://image.tmdb.org/t/p/';

        console.log('MovieService Initilalized');

    }
 
    GetTvSeasonAsPromise(id: number, season: number): Promise<ISeason> {
        console.log("GetTvSeasonAsPromise()");
        let localEpisodeData: IEpisode
        return this.http.get(this.BASE_URL + '/3/tv/' + id + '/season/' + (season + 1) + '?&api_key=' + this.apiKey, this.REQUEST_OPTIONS)
            .toPromise()
            .then((response: any): ISeason => {
                let data: any = response.json();
                return {
                    Id: data.id,
                    AirDate: data.air_date,
                    SeasonNumber: data.season_number,
                    Episodes: data.episodes.map(function (s: any): IEpisode {
                        return {
                            ShowId: id,
                            LongEpisodeId: `${id}S${s.season_number}N${s.episode_number}`,
                            Id: `S${s.season_number}N${s.episode_number}`, 
                            AirDate: s.air_date,
                            SeasonNumber: Number(s.season_number),
                            EpisodeNumber: Number(s.episode_number),
                            Name: s.name,
                            Overview: s.overview,
                            Wins: 0,
                            Losses: 0,
                            Ratio: 0.0,
                            Rank: 0
                        };
                    })
                };
            })
            .then((s) => {
                this.votingService.getEpisodes(id).subscribe(
                    data => {
                        if (data.err) {
                            //console.log(`${data.status} ${data.err.errno}: ${data.err.code}`);
                        } else {
                            //console.log(data);
                            if (data.length > 0) {
                                data.forEach((episode) => {
                                    var ep: IEpisode = s.Episodes[s.Episodes.findIndex(item => item.LongEpisodeId === episode['id'])];
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
                console.log(s);
                return s;
            });   
    }

    GetTvDetails(id: number): Promise<IShow> {
        let __this: any = this;
        return this.http.get(this.BASE_URL + '/3/tv/' + id + '?&api_key=' + this.apiKey, this.REQUEST_OPTIONS)
            .toPromise()
            .then((response: any): IShow => {
                let data: any = response.json();
                let show: IShow = {
                    Id: data.id,
                    PosterPath: this.imagesBaseUrl + 'w185' + data.poster_path,
                    Name: data.name,
                    BackdropPath: this.imagesBaseUrl + 'w1280' + data.backdrop_path,
                    HomePage: data.homepage,
                    Status: data.status,
                    InProduction: data.in_production,
                    NumberOfSeasons: data.number_of_seasons,
                    NumberOfEpisodes: data.number_of_episodes,
                    FirstAirDate: data.first_air_date,
                    LastAirDate: data.last_air_date,
                    Genres: data.genres.map(function (s: any): IGenre {
                        return { Id: s.id, Name: s.name };
                    }),
                    Seasons: data.seasons.map(function (s: any): ISeason {
                        return { SeasonNumber: s.season_number, Id: s.id, AirDate: s.air_date, Episodes: [] };
                    }),
                    Overview: data.overview
                };
                return show;
            });
    }

    /* Search for movies */
    SearchMovies(search: string, currentPage: number) {
        return this._jsonp.get(this.baseUrl + '/3/search/movie?callback=JSONP_CALLBACK&page=' + currentPage + '&query=' + search + '&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    SearchTelevision(search: string, currentPage: number) {
        return this._jsonp.get(this.baseUrl + '/3/search/tv?callback=JSONP_CALLBACK&page=' + currentPage + '&query=' + search + '&sort_by=popularity.desc&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    GetTvSeason(id: number, season: number) {
        return this._jsonp.get(this.baseUrl + '/3/tv/' + id + '/season/' + (season + 1) + '?callback=JSONP_CALLBACK&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    GetTvImages(id: number) {
        return this._jsonp.get(this.baseUrl + '/3/tv/' + id + '/images?callback=JSONP_CALLBACK&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    GetMovie(id: string) {
        return this._jsonp.get(this.baseUrl + '/3/movie/' + id + '?callback=JSONP_CALLBACK&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    /* Get popular movies*/
    GetPopularMovies() {
        return this._jsonp.get(this.baseUrl + '/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    /* Get movies in theaters */
    GetMoviesInTheaters() {
        return this._jsonp.get(this.baseUrl + '/3/discover/movie?callback=JSONP_CALLBACK&primary_release_date.gte=2017-01-11&primary_release_date.lte=2017-02-28&api_key=' + this.apiKey)
            .map(res => res.json());
    }

    /* Get highest rated movies rated 'R'*/
    GetHighestRatedRatedRMovies() {
        return this._jsonp.get(this.baseUrl + '/3/discover/movie?callback=JSONP_CALLBACK&certification_country=US&certification=R&sort_by=vote_average.desc&primary_release_date.gte=2015-01-01&primary_release_date.lte=2017-01-01&api_key=' + this.apiKey)
            .map(res => res.json());
    }


}