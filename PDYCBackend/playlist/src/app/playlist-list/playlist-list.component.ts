import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import {Playlist} from '../playlist';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  playlists : Playlist[];
  token = localStorage.getItem('apiKey');

  constructor(private router: ActivatedRoute, 
    private playlistService: PlaylistService, private route :Router,private authenticationService: AuthenticationService) {}


  ngOnInit(){

    if (this.token!=null) 
{
  this.playlistService.getPlaylists().subscribe(res =>{
    this.playlists=res;
  })
}     
  }

  logout(){
    if (localStorage.getItem('apiKey')!=null){
    localStorage.removeItem('apiKey'); 
    this.route.navigate([''])
    }
  }

}
