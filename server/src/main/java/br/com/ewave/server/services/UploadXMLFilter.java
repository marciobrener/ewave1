package br.com.ewave.server.services;

import java.io.IOException;
import br.com.ewave.business.ProcessarXMLs;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//@Component
public class UploadXMLFilter implements Filter {
    @Override
    public void doFilter(
        ServletRequest request, 
        ServletResponse response, 
        FilterChain chain
    ) throws IOException, ServletException {
 
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String xml = req.getParameterValues("xml")[0].toString();

        try {
            var writer = res.getWriter();
            var codigos = ProcessarXMLs.processarXMLAgentes(xml);
            for (String codigo : codigos) {
                String string = String.format("Codigo: %s", codigo);
                System.out.println(string);
                writer.print(string);
                Thread.sleep(100);
            }
            writer.close();

        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
