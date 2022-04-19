package ar.edu.unnoba.pdyc2021.mymusic.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import ar.edu.unnoba.pdyc2021.mymusic.model.Playlist;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;

public interface PlaylistService {
	public List<Playlist> getPlaylists();
	
	public boolean isExist(Long id);

	public Playlist findPlaylist(Long id);

	public void deletePlaylist(Long id, String loggedEmail) throws Exception;
	
	public void updatePlaylist(Long id,String name, String loggedEmail) throws Exception;
	
	public Playlist addPlaylist(Playlist p, String loggedEmail);
	
	public void addSongOnPlaylist(Playlist p, Song s, String loggedEmail) throws Exception;
	
	public void deleteSongOnPlaylist(Playlist p, Song s, String loggedEmail) throws Exception;
	
	public CompletableFuture<List<Playlist>> getPlaylistsAsync();

}
