export interface IShow {
    PosterPath?: string;
    BackdropPath: string;
    Genres: IGenre[];
    HomePage: string; 
    Id: number;
    InProduction: boolean;
    Name: string;
    Seasons: ISeason[];
    Status: string;
    NumberOfSeasons: number;
    NumberOfEpisodes: number;
    FirstAirDate: string;
    LastAirDate: string;
    Overview: string;
    AllEpisodes?: IEpisode[];
    Votes?: number;
}

export interface ISeason {
    Id: number;  
    AirDate: string;
    SeasonNumber: number;
    Episodes: IEpisode [];
}

export interface IEpisode {
    ShowId: number;
    LongEpisodeId?: string;
    Id: string;
    AirDate: string;
    EpisodeNumber: number;
    SeasonNumber: number;
    Name: string;
    Overview: string;
    Wins?: number;
    Losses?: number;
    Rank?: number;
    Ratio?: number;
}

export interface IGenre {
    Id: number;
    Name: string;
}