package br.com.ewave.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import br.com.ewave.server.services.UploadXMLFilter;

@EnableAutoConfiguration
@SpringBootApplication
public class ServerApplication {
    public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

    @Bean
    public FilterRegistrationBean<UploadXMLFilter> uploadXMLFilter() {
        FilterRegistrationBean<UploadXMLFilter> registration = new FilterRegistrationBean<UploadXMLFilter>();
        registration.setFilter(new UploadXMLFilter());
        registration.addUrlPatterns("/xml");
        registration.addUrlPatterns("/uploadXML");
        //registration.addUrlPatterns("/*");
        return registration;
    }
}
