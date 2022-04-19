import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs'; // only need to import from rxjs
import {Song} from './song';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(environment.API_URL + 'songs');
   
  }

}