
package ar.edu.unnoba.pdyc2021.mymusic.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collection;

import javax.persistence.Column;
/**
 * @author Santiago
 *
 */
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    public String getUsername(){
        return this.email;
    }

    public Long getId() {
        return id;
    }

    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    
    @Override
    public boolean isAccountNonExpired(){
        return true;
    }

   
    @Override
    public boolean isAccountNonLocked(){
        return true;
    }

    
    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }

    
    @Override
    public boolean isEnabled(){
        return true;
    }

    @Override
    public int hashCode(){
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0 );
        return hash;
    }

    @Override
    public boolean equals(Object obj){
        if(obj == null){
            return false;
        } else if (!(obj instanceof User)){ 
            return false;
        } else if (((User) obj).id.equals(this.id)){  
            return true;
        } else {
            return false;
        }
    }

    
}