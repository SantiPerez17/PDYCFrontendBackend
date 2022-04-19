package ar.edu.unnoba.pdyc2021.mymusic.dto;

import java.util.List;

public class playlistDTO {
	private Long id;
	private String name;
	private String author;
	private List<songDTO> songs;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String toString() {
		return "playlistDTO [name=" + name + ", author=" + author + ", songs=" + songs.toString() + "]";
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public List<songDTO> getSongs() {
		return songs;
	}
	public void setSongs(List<songDTO> songs) {
		this.songs = songs;
	}	

}
