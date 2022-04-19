package ar.edu.unnoba.pdyc2021.mymusic;


import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import ar.edu.unnoba.pdyc2021.mymusic.resource.PlaylistResource;
import ar.edu.unnoba.pdyc2021.mymusic.resource.SongResource;
import ar.edu.unnoba.pdyc2021.mymusic.resource.UserResource;


@Component
public class JerseyConfig extends ResourceConfig
{
    public JerseyConfig() 
    {
        register(SongResource.class);
        register(UserResource.class);
        register(PlaylistResource.class);
    }
}
