package ar.edu.unnoba.pdyc2021.mymusic.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import ar.edu.unnoba.pdyc2021.mymusic.model.Song;
import ar.edu.unnoba.pdyc2021.mymusic.dto.songDTO;
import ar.edu.unnoba.pdyc2021.mymusic.model.Genre;

public interface SongService {
    public List<Song> getSongs();
    public void addSong(Song song);
    public Song findSong(Long id) throws Exception;
    public void deleteSong(Long id) throws Exception;
    public List<Song> findByAuthor(String author);
    public List<Song> findByGenre(Genre genre);
    public void updateSong(songDTO song, Long id) throws Exception;
	public List<Song> findByAuthorAndGenre(String author,Genre genre);
	public Song findByAuthorAndGenreAndName(String author, Genre genre, String name);
	public Song checksongDTO(songDTO song);
	public boolean isExist(Long id);
	public CompletableFuture<List<Song>> getSongsAsync();
}
