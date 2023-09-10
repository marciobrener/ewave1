import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor() {
  }

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

  public static ping(): boolean {
    let request = new XMLHttpRequest()
    request.open("GET", `${environment.host}/ping`, false)

    let ok = false
    request.onreadystatechange = (response) => {
      ok = ok || request.readyState == 4 && request.status == 200
    }
    request.send()
    return ok
  }
}
