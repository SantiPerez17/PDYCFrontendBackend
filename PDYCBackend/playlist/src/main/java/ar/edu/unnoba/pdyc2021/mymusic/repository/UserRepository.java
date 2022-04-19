package ar.edu.unnoba.pdyc2021.mymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ar.edu.unnoba.pdyc2021.mymusic.repository.PlaylistRepository;

import ar.edu.unnoba.pdyc2021.mymusic.model.User;


@Repository("userRepository")
public interface UserRepository extends JpaRepository<User,Long>{
	public User findByEmail(@Param("email") String email);
	public boolean existsByEmail(String email); 
	@Modifying
    @Query("DELETE User s WHERE s.id = ?1")
    void deleteByIdWithJPQL(Long id);
}

