package ar.edu.unnoba.pdyc2021.mymusic.dto;

import ar.edu.unnoba.pdyc2021.mymusic.model.Genre;

public class songDTO {

	private String name, author;
	private Genre genre;
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String toString() {
		return "songDTO [name=" + name + ", author=" + author + ", genre=" + genre + "]";
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Genre getGenre() {
		return genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

}
