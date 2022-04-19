/**
 * 
 */
package ar.edu.unnoba.pdyc2021.mymusic.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ar.edu.unnoba.pdyc2021.mymusic.model.Playlist;
import ar.edu.unnoba.pdyc2021.mymusic.model.Song;

/**
 * @author Santiago
 *
 */
@Transactional
@Repository("playlistRepository")
public interface PlaylistRepository extends JpaRepository<Playlist,Long>{

	@Modifying
    @Query("DELETE Playlist  p WHERE p.owner.id = ?1")
    void deleteByUserId(Long id);
}
