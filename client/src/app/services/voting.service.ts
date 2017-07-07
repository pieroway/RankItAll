import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';

import 'rxjs/add/operator/map';

@Injectable()
export class VotingService {

  // Define the routes we are going to interact with
  private baseUrl = 'http://localhost:3001/api';
 
  constructor(private http: Http) { }

  // Implement a method to save a vote to the local db
  saveVote(showId: number, winId: string, loseId: string)  {
      return this.http.get(`${this.baseUrl}/vote/${showId}/${winId}/${loseId}`).map((res:Response) => res.json());
  }

  // Implement a method to save a vote to the local db
  // :showId/:episodeId/:longEpisodeId/:episodeOverview
  saveEpisodeOverview(showId: number, episodeId: string, longEpisodeId: string, episodeOverview: string)  { 
      return this.http.get(`${this.baseUrl}/saveoveriew/${showId}/${episodeId}/${longEpisodeId}/${episodeOverview}`).map((res:Response) => res.json());
  }

  // Implement a method to save a vote to the local db
  getTopTen()  {
      return this.http.get(`${this.baseUrl}/topten`).map((res:Response) => res.json());
  }

  getVotes(showId: number) {
      return this.http.get(`${this.baseUrl}/votes/${showId}`).map((res:Response) => res.json());
  }
  
  // Implement a method to get an episode from the local db
  getEpisodes(showId: number)  {
      return this.http.get(`${this.baseUrl}/getepisodes/${showId}`).map((res:Response) => res.json());
  }  

  // Implement a method to get an episode from the local db
  getEpisodesData(showId: number, longEpisodeId: string)  {
      return this.http.get(`${this.baseUrl}/episode/${showId}/${longEpisodeId}`).map((res:Response) => res.json());
  }  
 
  // Implement a method to save a vote to the local db
  // :showId/:episodeId/:longEpisodeId/:episodeOverview
  saveComment(showId: number, comment: string)  { 
      return this.http.get(`${this.baseUrl}/savecomment/${showId}/${comment}`).map((res:Response) => res.json());
  }
  
  // Implement a method to get an episode from the local db
  getComments(showId: number)  {
      return this.http.get(`${this.baseUrl}/comments/${showId}`).map((res:Response) => res.json());
  }

 
  // Implement a methods to handle errors if any
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}