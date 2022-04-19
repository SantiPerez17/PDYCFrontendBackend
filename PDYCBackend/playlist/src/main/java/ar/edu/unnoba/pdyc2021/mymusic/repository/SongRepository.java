package ar.edu.unnoba.pdyc2021.mymusic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ar.edu.unnoba.pdyc2021.mymusic.model.Genre;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;



@Repository("songRepository")
public interface SongRepository extends JpaRepository<Song,Long>{
	@Query("select s from Song s where s.author = :author")
	public List<Song> findSongsByAuthor(@Param("author") String author); 
	
	@Query("select s from Song s where s.genre = :genre")
	public List<Song> findSongsByGenre(@Param("genre") Genre genre);
	
	@Query("select s from Song s where s.genre = :genre and s.author = :author")
	public List<Song> findSongsByAuthorAndGenre(@Param("genre") Genre genre, @Param("author") String author);
	
	@Query("select s from Song s where s.genre = :genre and s.author = :author and s.name = :name")
	public Song findByAuthorAndGenreAndName(@Param("author") String author, @Param("genre") Genre genre, @Param("name") String name);
	
}

