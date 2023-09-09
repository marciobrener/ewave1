package br.com.ewave.server;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.io.IOException;

import org.jdom2.JDOMException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import br.com.ewave.business.ProcessarXMLs;

@SpringBootTest
public class ProcessarXMLsTest {
    @Test
    void processarXMLAgentes() throws JDOMException, IOException {
        String path = "src/test/files/exemplo_02.xml";
        File file = new File(path);
        boolean ok = file.exists();
        String message = "processarXMLAgentes(%s)";
        message = String.format(message, file.getAbsolutePath());

        if (ok) try {
            ok = ok && ProcessarXMLs.processarXMLAgentes(file).size() > 0;
            if (!ok) message += "\nNão há agente(s) no arquivo!";
        } catch (Exception exception) {
            message = exception.getMessage();
        }

        assertTrue(ok, message);
    }
}
