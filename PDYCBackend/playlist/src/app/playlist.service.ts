import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs'; // only need to import from rxjs
import {Playlist} from './playlist';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }
  getPlaylists(): Observable<Playlist[]> {
    const httpOptions={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('apiKey'),
     })  
    };
    console.log('apiKey: ', localStorage.getItem('apiKey'));
    return this.http.get<Playlist[]>(environment.API_URL + 'playlists', httpOptions);
   
  }

}
