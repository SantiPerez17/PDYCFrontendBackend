package ar.edu.unnoba.pdyc2021.mymusic.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.pdyc2021.mymusic.model.User;
import ar.edu.unnoba.pdyc2021.mymusic.repository.PlaylistRepository;
import ar.edu.unnoba.pdyc2021.mymusic.repository.UserRepository;
@Service 
public class UserServiceImp implements UserService{

	 @Autowired
	 private UserRepository userRepository;
	 @Autowired
	 private PlaylistRepository playlistRepository;
	 
	 @Override
	 public List<User> getUsers() {
		 return userRepository.findAll();
	    }

	@Override
	public User addUser(User user) throws Exception  {
		if (userRepository.existsByEmail(user.getEmail()) == false){
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		return userRepository.save(user);
	}else {
		throw new Exception("There is already a user with that email: " + user.getEmail());
	}
	}
	
	@Override
	public User findUser(Long id) throws Exception {
		if (userRepository.existsById(id)){
		return userRepository.findById(id).get();
	}else {
		throw new Exception("User not found.");
	}
	}


	@Transactional
	@Override
	public void deleteUser(Long id,String currentUserEmail) throws Exception {
		User user = userRepository.findByEmail(currentUserEmail);
		 if(userRepository.existsById(id)==false){
	            throw new Exception("User not found.");
        }else{
        	 if(userRepository.findById(id).get().equals(user)){
        		 playlistRepository.deleteByUserId(id);
        		 userRepository.deleteByIdWithJPQL(id);
                 }  	
          else {
            throw new Exception("You cannot delete another user.");
        }
	}
        }

	@Override
	public void updateUser(User user, Long id, String currentUserEmail) throws Exception {
		User currentUser = userRepository.findByEmail(currentUserEmail);
		if(userRepository.findById(id).get().equals(currentUser)) {
			User u = userRepository.findById(id).get();
			if (user.getEmail()!=null) {u.setEmail(user.getEmail());}
			if (user.getPassword()!=null) {u.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));}
        userRepository.save(u);
		}else {
			throw new Exception("You cannot modify another user.");
		}
		
	}
	
	@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return (UserDetails) this.findByEmail(email);
    }

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

}
