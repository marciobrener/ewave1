package br.com.ewave.business;

import java.io.CharArrayReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class ProcessarXMLs {
    public static Collection<String> processarXMLAgentes(File file) throws JDOMException, IOException {
        return processarXMLAgentes(new FileInputStream(file));
    }

    public static Collection<String> processarXMLAgentes(InputStream inputStream) throws JDOMException, IOException {
        SAXBuilder builder = new SAXBuilder();
        Document document = builder.build(inputStream);
        return parse(document);
    }

    public static Collection<String> processarXMLAgentes(String xml) throws JDOMException, IOException {
        SAXBuilder builder = new SAXBuilder();
        CharArrayReader reader = new CharArrayReader(xml.toCharArray());
        Document document = builder.build(reader);
        return parse(document);
    }
    
    private static Collection<String> parse(Document document) {
        Collection<String> result = new ArrayList<String>();
        Element root = document.getRootElement();
        List<Element> agentes = root.getChildren("agente");
        for (Element agente : agentes) {
            String string = agente.getChild("codigo").getValue();
            result.add(string);
        }
    
        return result;
    }
}