/**
 * 
 */
package ar.edu.unnoba.pdyc2021.mymusic.resource;

import java.lang.reflect.Type;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;

import ar.edu.unnoba.pdyc2021.mymusic.dto.userDTO;
import ar.edu.unnoba.pdyc2021.mymusic.model.User;
import ar.edu.unnoba.pdyc2021.mymusic.service.UserService;

/**
 * @author Santiago
 *
 */
@Path("/users")
public class UserResource {

	@Autowired
    private UserService userService;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers(){
    	ModelMapper modelMapper = new ModelMapper();
    	Type ListType = new TypeToken<List<userDTO>>(){}.getType();
    	List<userDTO> list = modelMapper.map(userService.getUsers(), ListType);
        return Response.ok(list).build();
    }
    
    @GET
    @Path("/filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByEmail(@QueryParam("email") String email)
    {
    	try {
    		ModelMapper modelMapper = new ModelMapper();
    	Type UserType = new TypeToken<userDTO>(){}.getType();
    	userDTO user = modelMapper.map(userService.findByEmail(email), UserType);
    	return Response.ok(user).build();
    	}catch (Exception e){
    		return Response.status(Response.Status.NOT_FOUND).entity("User not found for email: " + email).build();
    	}
    	
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addUser(User user)
    {
    	try {
    		userService.addUser(user);
    		return Response.status(Response.Status.CREATED).entity("User created with email: " + user.getEmail()).build();
    	}
    	catch (Exception e) {
    		return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e.getMessage()).build();
    	}
    	}
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserById(@PathParam("id") Long id)
    {
    	 try{
    		 ModelMapper modelMapper = new ModelMapper();
    	    	Type UserType = new TypeToken<userDTO>(){}.getType();
    	    	userDTO list = modelMapper.map(userService.findUser(id), UserType);
    	    	return Response.ok(list).build();
    	        } catch (Exception e){
    	        	return Response.status(Response.Status.NOT_FOUND).entity("User not found for ID: " + id).build();
    	        }
    }
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteUser(@PathParam("id") Long id)
    {
    	try {
    		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String loggedEmail = (String) auth.getPrincipal();
            userService.deleteUser(id, loggedEmail);
    	return Response.status(Response.Status.OK).entity("User deleted with ID: " + id).build();
  
    	}catch(Exception e) {
    		
    		return Response.status(Response.Status.FORBIDDEN).entity(e.getMessage()).build();
    	}
    	
    }
    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@RequestBody User user, @PathParam("id") Long id)
    {
    	try{
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedEmail = (String) auth.getPrincipal();
        userService.updateUser(user, id, loggedEmail);
        return Response.status(Response.Status.OK).entity("User updated with ID: " + id).build();
  
    }catch (Exception e){
    	return Response.status(Response.Status.FORBIDDEN).entity(e.getMessage()).build();
    	
    }
    
    }
    

}
