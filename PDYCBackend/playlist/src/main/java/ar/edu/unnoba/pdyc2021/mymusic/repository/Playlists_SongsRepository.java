package ar.edu.unnoba.pdyc2021.mymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ar.edu.unnoba.pdyc2021.mymusic.model.Playlist;
import ar.edu.unnoba.pdyc2021.mymusic.model.Playlists_Songs;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;

public interface Playlists_SongsRepository extends JpaRepository<Playlists_Songs,Long> {
	@Query("select ps from Playlists_Songs ps where ps.playlist = :playlist and ps.song = :song")
	public Playlists_Songs findPlaylists_Songs(@Param("playlist") Playlist playlist, @Param("song") Song song);
}