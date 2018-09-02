import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { IShow, ISeason, IEpisode, IGenre } from '../app/app.interface';

import 'rxjs/add/operator/map';

@Injectable()
export class VotingService {

  // Define the routes we are going to interact with
  private baseUrl = 'http://localhost:3001/api';
 
  constructor(private http: Http) { }
 
  saveVote(showId: number, winId: string, loseId: string)  {
      return this.http.get(`${this.baseUrl}/vote/${showId}/${winId}/${loseId}`).map((res:Response) => res.json());
  }
 
  // :showId/:episodeId/:longEpisodeId/:episodeOverview
  saveEpisodeOverview(showId: number, episodeId: string, longEpisodeId: string, episodeOverview: string)  { 
      return this.http.get(`${this.baseUrl}/saveoveriew/${showId}/${episodeId}/${longEpisodeId}/${episodeOverview}`).map((res:Response) => res.json());
  }
 
  getTopTen()  {
      return this.http.get(`${this.baseUrl}/topten`).map((res:Response) => res.json());
  }

  getVotes(showId: number) {
      return this.http.get(`${this.baseUrl}/votes/${showId}`).map((res:Response) => res.json());
  }
   
  getEpisodes(showId: number)  {
      return this.http.get(`${this.baseUrl}/getepisodes/${showId}`).map((res:Response) => res.json());
  }  
 
  getEpisodesData(showId: number, longEpisodeId: string)  {
      return this.http.get(`${this.baseUrl}/episode/${showId}/${longEpisodeId}`).map((res:Response) => res.json());
  }  
  
  // :showId/:episodeId/:longEpisodeId/:episodeOverview
  saveComment(showId: number, comment: string, username: string)  { 
      return this.http.get(`${this.baseUrl}/savecomment/${showId}/${comment}/${username}`).map((res:Response) => res.json());
  }

  getComments(showId: number)  {
      return this.http.get(`${this.baseUrl}/comments/${showId}`).map((res:Response) => res.json());
  }

  addModerator(showId: number, email: string)  {
      return this.http.get(`${this.baseUrl}/moderator/add/${showId}/${email}`).map((res:Response) => res.json());
  }

  deleteModerator(showId: number)  {
      return this.http.get(`${this.baseUrl}/moderator/delete/${showId}`).map((res:Response) => res.json());
  }

  getModerator(showId: number)  {
      return this.http.get(`${this.baseUrl}/moderator/get/${showId}`).map((res:Response) => res.json());
  }
 
  // Implement a methods to handle errors if any
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}