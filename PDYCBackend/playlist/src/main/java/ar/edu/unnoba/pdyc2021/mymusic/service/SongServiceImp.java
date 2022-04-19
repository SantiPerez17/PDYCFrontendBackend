package ar.edu.unnoba.pdyc2021.mymusic.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.pdyc2021.mymusic.dto.songDTO;
import ar.edu.unnoba.pdyc2021.mymusic.model.Genre;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;
import ar.edu.unnoba.pdyc2021.mymusic.repository.SongRepository;

@Service
public class SongServiceImp implements SongService {

    @Autowired
    private SongRepository songRepository;

    @Override
    public List<Song> getSongs() {
        return songRepository.findAll();
    }
    
    @Override
	public Song findSong(Long id) throws Exception {
		if (songRepository.existsById(id)){
		return songRepository.findById(id).get();
	}else {
		throw new Exception("Song not found.");
	}
	}
    
    @Override
    public boolean isExist(Long id) {
    	return songRepository.existsById(id);
    }
    
	@Override
	public void addSong(Song song) {
		songRepository.save(song);
		
	}

	@Override
	public void deleteSong(Long id) throws Exception {
		if (songRepository.existsById(id)){
			songRepository.deleteById(id);
		}else {
			throw new Exception("Song not found.");
		}
		}

	@Override
	public List<Song> findByAuthor(String author) {
		return songRepository.findSongsByAuthor(author);
	}

	@Override
	public List<Song> findByGenre(Genre genre) {
		return songRepository.findSongsByGenre(genre);
	}
	
	@Override
	public List<Song> findByAuthorAndGenre(String author,Genre genre) {
		return songRepository.findSongsByAuthorAndGenre(genre,author);
	}
	
	@Override
	public Song findByAuthorAndGenreAndName(String author,Genre genre,String name) {
		return songRepository.findByAuthorAndGenreAndName(author, genre, name);
	}
	
	
	
	@Override
    public void updateSong(songDTO song, Long id) throws Exception {
		try {
			Song s = songRepository.findById(id).get();
        if (song.getName()!=null) {s.setName(song.getName());;}
        if (song.getAuthor()!=null) {s.setAuthor(song.getAuthor());}
        if (song.getGenre()!=null) {s.setGenre(song.getGenre());}
        songRepository.save(s);
		}
		catch(Exception e) {
			throw new Exception("Song not found");
		}
        
    }

	@Override
	public Song checksongDTO(songDTO song){
			Song s=songRepository.findByAuthorAndGenreAndName(song.getAuthor(), song.getGenre(), song.getName());
			return s;
		
	}

	@Override
    @Async("taskExecutor")
    public CompletableFuture<List<Song>> getSongsAsync() {
        return CompletableFuture.completedFuture(songRepository.findAll());
    }
    
}
