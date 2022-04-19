package ar.edu.unnoba.pdyc2021.mymusic.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.pdyc2021.mymusic.model.Playlist;
import ar.edu.unnoba.pdyc2021.mymusic.model.Playlists_Songs;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;
import ar.edu.unnoba.pdyc2021.mymusic.model.User;
import ar.edu.unnoba.pdyc2021.mymusic.repository.PlaylistRepository;
import ar.edu.unnoba.pdyc2021.mymusic.repository.Playlists_SongsRepository;
import ar.edu.unnoba.pdyc2021.mymusic.repository.UserRepository;

@Service
public class PlaylistServiceImp implements PlaylistService {
	@Autowired
    private PlaylistRepository playlistRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private Playlists_SongsRepository playlists_songsRepository;

	@Override
    public List<Playlist> getPlaylists() {
        return playlistRepository.findAll();
    }

	@Override
	public Playlist findPlaylist(Long id) {
		return playlistRepository.findById(id).get();
	}

	@Override
	public void deletePlaylist(Long id, String loggedEmail) throws Exception {
		User user = userRepository.findByEmail(loggedEmail);
		 if(playlistRepository.existsById(id)==false){
	            throw new Exception("Playlist not found.");
       }else{
    	   Playlist p = playlistRepository.findById(id).get();
       	 if(p.getOwner().equals(user)){
                playlistRepository.deleteById(id); 
                }  	
         else {
           throw new Exception("You cannot delete another playlist.");
       }
	}
       }


	@Override
	public Playlist addPlaylist(Playlist p, String loggedEmail) {
	    User currentUser = userRepository.findByEmail(loggedEmail);
	    p.setOwner(currentUser);
		return playlistRepository.save(p);
	}

	@Override
	public void addSongOnPlaylist(Playlist p, Song s,String loggedEmail) throws Exception{
		User user = userRepository.findByEmail(loggedEmail);
		if(p.getOwner().equals(user)){
			Playlists_Songs ps = new Playlists_Songs();
    		ps.setPlaylist(p);
    		ps.setSong(s);
    		if (playlists_songsRepository.findPlaylists_Songs(p, s)==null) {
    		playlists_songsRepository.save(ps);
    		}else {
    			throw new Exception("The music already exists.");
    		}
    		}
		else {
			throw new Exception("Failed to add song. You are not the owner of the playlist ");
			}
		}
	
		

	@Override
	public void deleteSongOnPlaylist(Playlist p, Song s, String loggedEmail) throws Exception{
		User user = userRepository.findByEmail(loggedEmail);
		if(p.getOwner().equals(user)){
			if(playlists_songsRepository.findPlaylists_Songs(p, s)!=null)
			{
				playlists_songsRepository.deleteById(playlists_songsRepository.findPlaylists_Songs(p, s).getId());
    		}else {throw new Exception("The music is not on the list.");}
			}
		else {
			throw new Exception("Failed to delete song. You are not the owner of the playlist ");
			}
		}
		

	@Override
	public void updatePlaylist(Long id, String name, String loggedEmail) throws Exception {
		User user = userRepository.findByEmail(loggedEmail);
		 if(playlistRepository.existsById(id)==false){
	            throw new Exception("Playlist not found.");
       }else{
    	   Playlist p = playlistRepository.findById(id).get();
       	 if(p.getOwner().equals(user)){
              p.setName(name);
              playlistRepository.save(p);
              }  	
         else {
           throw new Exception("You cannot update this playlist.");
       }
	}
       }

	@Override
	public boolean isExist(Long id) {
		return playlistRepository.existsById(id);
	}

	@Override
    @Async("taskExecutor")
    public CompletableFuture<List<Playlist>> getPlaylistsAsync() {
        return CompletableFuture.completedFuture(playlistRepository.findAll());
    }

		
	}


