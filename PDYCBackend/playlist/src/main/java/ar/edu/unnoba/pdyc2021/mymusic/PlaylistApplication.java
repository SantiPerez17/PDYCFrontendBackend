package ar.edu.unnoba.pdyc2021.mymusic;
import java.util.concurrent.Executor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import ar.edu.unnoba.pdyc2021.mymusic.PlaylistApplication;

@SpringBootApplication
@EnableAsync
public class PlaylistApplication {
	public static void main(String[] args) {
		SpringApplication.run(PlaylistApplication.class, args);
	}
	@Bean("taskExecutor")
	public Executor getAsyncExecutor(){
		final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(400);
		executor.setMaxPoolSize(4000);
		executor.setQueueCapacity(400);
		executor.setThreadNamePrefix("executor-");
		executor.initialize();
		return executor;
	}
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() { return new BCryptPasswordEncoder();
}
}
