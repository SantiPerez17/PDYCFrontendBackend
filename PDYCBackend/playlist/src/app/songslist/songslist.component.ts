import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../song.service';
import { Song } from '../song';
@Component({
  selector: 'songslist',
  templateUrl: './songslist.component.html',
  styleUrls: ['./songslist.component.css']
})
export class SongsListComponent implements OnInit {
  songs : Song[];

  constructor(private router: ActivatedRoute, private songService: SongService) {}


  ngOnInit(){
    this.songService.getSongs().subscribe(res =>{
      this.songs=res;
    })
  }
 
  

}