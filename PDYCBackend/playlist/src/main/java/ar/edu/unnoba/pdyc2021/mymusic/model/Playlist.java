
package ar.edu.unnoba.pdyc2021.mymusic.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;
import javax.persistence.Table;

/**
 * @author Santiago
 *
 */
@Entity
@Table(name = "playlists")
public class Playlist {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    
	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn
	    private User owner;
	    
	    @OneToMany(mappedBy = "playlist", fetch = FetchType.EAGER)
	    private List<Playlists_Songs> playlists_Songs;

		public Long getId() {
			return id;
		}
		
		@PreRemove
		public void nullificarPlaylists() {
			this.owner=null;
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

		public User getOwner() {
			return owner;
		}

		public void setOwner(User owner) {
			this.owner = owner;
		}


		public void setPlaylists_Songs(List<Playlists_Songs> playlists_Songs) {
			this.playlists_Songs = playlists_Songs;
		}

		public List<Playlists_Songs> getPlaylists_Songs() {
			return playlists_Songs;
		}
 
	

}
