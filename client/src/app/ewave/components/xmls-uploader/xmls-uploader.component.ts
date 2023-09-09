import { Component, Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon'
import { Form } from '@angular/forms';
import { SecurityComponent } from './../../security/security.component';

@Component({
  selector: 'app-xmls-uploader',
  templateUrl: './xmls-uploader.component.html',
  styleUrls: ['./xmls-uploader.component.css']
})

@Injectable()
export class XMLsUploaderComponent implements OnInit {
  private files: FileList | null = null

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }


  change(files: FileList): void {
    debugger
    this.files = files
  }

  submit(): void {
      debugger

      let files = this.files as FileList
      for (let i = 0; i < files.length; i++) {
          debugger
          let file = files[i] as File
          this.uploadDocument(file)
      }
  }

  uploadDocument(file: File) {
    debugger
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let xml = SecurityComponent.parseXMLAgentes(fileReader.result as string)
      const formData = new FormData()
      formData.append("file", xml)
      this.http.post('http://localhost:5000', formData)
      .subscribe(response => {
          console.log(response);
          alert('Uploaded Successfully.');
      })
    }
    fileReader.readAsText(file);
  }
}

