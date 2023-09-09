import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public static parseXMLAgentes(xml: string): string {
    let result = ""
    xml = xml.replace(/\n/g, "").trim()

    const precoMedioStarts = "<precoMedio>"
    const precoMedioEnds = "</precoMedio>"
    let ok = true
    for (let i = 0; i < xml.length; i++) {
      if (xml.substring(i).startsWith(precoMedioEnds)) {
        i += precoMedioEnds.length
        ok = true
      }

      ok = ok && !xml.substring(i).startsWith(precoMedioStarts)
      if (ok) result += xml.charAt(i)
    }

    result = result.trim()
    return result
  }

  public static uploadXML(xml: string) /*: Promise<Object> */ {
    const data = {"xml": xml}

    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }))

    const url = 'http://localhost:5000/uploadXML'
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml',
      }),
    }

    http.post(url, data, headers)
    .subscribe(response => {
      debugger
      response
    })
  }

  public static NotWorking_uploadXML(xml: string) /*: Promise<Object> */ {
    const formData = new FormData()
    const blob = new Blob([xml], {type: 'application/xml'})

    formData.append("xml", blob, "filename")

    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }))

    const url = 'http://localhost:5000/uploadXML'
    const headers = {
      headers: {
        'Content-Type': 'application/xml'
      }
    }

    http.post(url, formData, headers)
    .subscribe(response => {
      debugger
      response
    })
  }

  public static async uploadFileXML(value: string | Blob, filename: string | null): Promise<Object> {
    const formData = new FormData()
    if( value instanceof Blob) {
      formData.append("file", value, filename ? filename : "filename")
    } else {
      formData.append("file", value)
    }

    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }))

    const url = 'http://localhost:5000/uploadXML'
    const headers = {
      headers: {'Content-Type': 'multipart/form-data'}
    }

    return http.post(url, formData, headers)
    .subscribe(response => response)
  }
}
