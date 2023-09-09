package br.com.ewave.server.services;

import java.io.IOException;
import java.util.Collection;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.ewave.business.ProcessarXMLs;

import org.apache.tomcat.util.http.fileupload.impl.InvalidContentTypeException;
import org.jdom2.JDOMException;

@RestController
public class Uploader {

    @CrossOrigin(origins = "localhost:*")
    @RequestMapping(
        method = RequestMethod.POST,
        path = "/uploadXML",
        consumes = {MediaType.TEXT_XML_VALUE}
    )
    public ResponseEntity<String> upload(@RequestParam String xml) {
        ResponseEntity<String> result = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        String message = "Apenas application/xml é permitido!";

        try {
            Collection<String> codigos = ProcessarXMLs.processarXMLAgentes(xml);
            codigos.forEach(codigo -> System.out.println(codigo));

            result = ResponseEntity.status(HttpStatus.OK).body(null);
        } 
        catch (InvalidContentTypeException exception) {
            result = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
        catch (JDOMException | IOException exception) {
            exception.printStackTrace();
        }

        return result;
    }

    @CrossOrigin(origins = "localhost:*")
    @RequestMapping(
        method = RequestMethod.POST,
        path = "/uploadXMLFile",
        consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}
    )
    public ResponseEntity<String> upload(@RequestParam MultipartFile file)
    throws InvalidContentTypeException {
        String message = "Apenas application/xml é permitido!";

        if (!"application/xml".equals(file.getContentType())) {
            throw new InvalidContentTypeException(message);
        }

        return null;
    }
}
