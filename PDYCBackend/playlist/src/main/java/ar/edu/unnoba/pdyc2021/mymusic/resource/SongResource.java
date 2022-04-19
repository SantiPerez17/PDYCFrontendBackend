package ar.edu.unnoba.pdyc2021.mymusic.resource;

import java.lang.reflect.Type;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import ar.edu.unnoba.pdyc2021.mymusic.dto.songDTO;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;
import ar.edu.unnoba.pdyc2021.mymusic.model.Genre;
import ar.edu.unnoba.pdyc2021.mymusic.service.SongService;

/*
URI para retornar listado de canciones es
GET http://localhost:8080/myapp/songs
 */

@Path("/songs")
public class SongResource {

    @Autowired
    private SongService songService;
/*
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSongs(){
    	ModelMapper modelMapper = new ModelMapper();
    	Type ListType = new TypeToken<List<songDTO>>(){}.getType();
    	List<songDTO> list = modelMapper.map(songService.getSongs(), ListType);
    	
        return Response.ok(list).build();
    }
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSongs(@QueryParam("author") String author, @QueryParam("genre") Genre genre) {
    	List<Song> list = new ArrayList<Song>();
    	if (author != null && genre == null) {
    		list = songService.findByAuthor(author);
    	}
   		if (genre != null && author == null) {
    			list = songService.findByGenre(genre);
    	}
    	if( genre!=null && author != null ) {
    			list = songService.findByAuthorAndGenre(author,genre);
    	}
    	if (genre==null && author==null) {
    		list = songService.getSongs();
    	}
    	ModelMapper modelMapper = new ModelMapper();
    	Type ListType = new TypeToken<List<songDTO>>(){}.getType();
    	List<songDTO> listy = modelMapper.map(list, ListType);
    	return Response.ok(listy).build();
    }
    */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public void getSongs(@Suspended AsyncResponse response, @QueryParam("author") String author, @QueryParam("genre") Genre genre){
        songService.getSongsAsync().thenAccept((list) -> {
        	if (author != null && genre == null) {
        		list = songService.findByAuthor(author);
        	}
       		if (genre != null && author == null) {
       			
        			list = songService.findByGenre(genre);
        	}
        	if( genre!=null && author != null ) {
        			list = songService.findByAuthorAndGenre(author,genre);
        	}
        	if (genre==null && author==null) {
        		list = songService.getSongs();
        	}
        	ModelMapper modelMapper = new ModelMapper();
        	Type ListType = new TypeToken<List<songDTO>>(){}.getType();
        	List<songDTO> listy = modelMapper.map(list, ListType);
            response.resume(Response.ok(listy).build());
        });
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createSong(songDTO songDTO){
        ModelMapper modelMapper = new ModelMapper();
        Song song = modelMapper.map(songDTO,Song.class);
        songService.addSong(song);
        return Response.ok("Added: " + songDTO.toString()).build();
    }      
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSongById(@PathParam("id") Long id)
    {
    	try {
    		Song song = songService.findSong(id);
    	ModelMapper modelMapper = new ModelMapper();
    	Type songType = new TypeToken<songDTO>(){}.getType();
    	songDTO songdto = modelMapper.map(song, songType);
    	return Response.ok(songdto).build();
    	}catch (Exception e) {
    		return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
    		
    	}    	
    }

    /*
    @GET
    @Path("/{song}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIdSong(@QueryParam("name") String name, @QueryParam("author") String author, @QueryParam("genre") Genre genre)
    {
    	try {
    		Song song = songService.findByAuthorAndGenreAndName(author, genre, name);
    	ModelMapper modelMapper = new ModelMapper();
    	Type songType = new TypeToken<songDTO>(){}.getType();
    	songDTO songdto = modelMapper.map(song, songType);
    	return Response.ok(songdto).build();
    	}catch (Exception e) {
    		return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();   		
    	}    	
    }
    */
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteSong(@PathParam("id") Long id)
    {
    	try {
			songService.deleteSong(id);
			 return Response.ok("Song deleted.").build();
		} catch (Exception e) {
			return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
		}
  
    }
    
    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateSong(@RequestBody songDTO song, @PathParam("id") Long id)
    {
    		try {
				songService.updateSong(song, id);
				Song s = songService.findSong(id);
				return Response.ok("Song " + s.getName() + " updated."  ).build();
			} catch (Exception e) {
				return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
			}
  
    }
    
    
}
