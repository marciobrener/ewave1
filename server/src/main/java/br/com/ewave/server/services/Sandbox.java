package br.com.ewave.server.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class Sandbox implements Filter {
    public Sandbox() {
        System.out.println("Sandbox()");
    }

    @Override
    public void doFilter(
      ServletRequest request, 
      ServletResponse response, 
      FilterChain chain) throws IOException, ServletException {
 
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        var names = req.getHeaderNames();
        String name;
        while (names.hasMoreElements()) {
            name = names.nextElement();
            //var bytes = req.getParameter(name).getBytes();
            var value = req.getHeader(name);
            System.out.println(name + ": " + value);
        }

        names = req.getParameterNames();
        while (names.hasMoreElements()) {
            name = names.nextElement();
            //var bytes = req.getParameter(name).getBytes();
            var value = req.getParameterValues(name)[0];
            System.out.println(name);
            System.out.println(value);
        }

        names = req.getAttributeNames();
        while (names.hasMoreElements()) {
            name = names.nextElement();
            var bytes = req.getAttribute(name);
            //var value = new String(bytes);
            System.out.println(name);
            //System.out.println(value);
        }

        var inputStream = req.getInputStream();
        String result = new BufferedReader(
            new InputStreamReader(inputStream))
            .lines().collect(Collectors.joining("\n"));
        System.out.println(result);
    }
}
