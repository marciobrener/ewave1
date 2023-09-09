import { Component,
  Injectable,
  OnInit
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityComponent } from './../../security/security.component';

@Component({
  selector: 'app-xmls-uploader',
  templateUrl: './xmls-uploader.component.html',
  styleUrls: ['./xmls-uploader.component.css']
})



@Injectable()
export class XMLsUploaderComponent implements OnInit {
  readonly title = "Upload de arquivos XML"
  private files: FileList | null = null
  readonly items$ = new Map<string, ExecuteItem>()

  constructor(private http$: HttpClient) {
  }

  ngOnInit(): void {
  }

  onFilesChange(files: FileList): void {
    this.files = files
    for (let i = 0; i < files.length; i++) {
        let file = files[i] as File
        if (this.items$.has(file.name)) continue
        this.items$.set(file.name, new ExecuteItem(file))
    }

    this.startUploads()
  }

  private startUploads() {
    for (let item of this.items$.values()) {
      if (!item.ready) continue
      this.upload(item)
      return
    }
  }

  private upload(item: ExecuteItem): void {
    console.log(item.file.name)
    item.uploading = true

    let file = item.file
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const xml = SecurityComponent.parseXMLAgentes(fileReader.result as string)
      const formData = new FormData()
      formData.append("xml", xml)

      const url = 'http://localhost:5000/uploadXML'
      let headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/xml'
        }),
      }

      this.http$.post<string>(url, formData)
      .subscribe(observer => {
        debugger
      })
      .add(() => {
        item.done = true
        this.startUploads()
      })
    }

    fileReader.readAsText(file);
  }
}

class ExecuteItem {
  file: File
  private _done: boolean
  private _failed: boolean
  private _waiting: boolean
  private _uploading: boolean
  private _xml: boolean
  private _message: string

  constructor(file: File) {
    this.file = file
    this._done = false
    this._failed = false
    this._uploading = false
    this._xml = file.name.toLowerCase().endsWith(".xml")
    this._waiting = this._xml
    this._message = !this._xml ? "Não é um arquivo XML" : ""
  }

  public get xml(): boolean {
    return this._xml
  }

  public get done(): boolean {
    return this._done
  }

  public set done(value: boolean) {
    this._done = value
    this._failed = !value
    this._uploading = false
    this._waiting = false
  }

  public get failed(): boolean {
    return this._failed
  }

  public set failed(value: boolean) {
    this._failed = value
    this._done = !value
    this._uploading = false
  }

  public get uploading(): boolean {
    return this._uploading
  }

  public set uploading(value: boolean) {
    this._uploading = value
    this._done = false
    this._failed = false
    this._waiting = false
  }

  public get waiting(): boolean {
    return this._waiting
  }


  public get message(): string {
    return this._message
  }

  public get ready(): boolean {
    let result = this.xml
    result = result && !this.uploading
    result = result && !this.done
    result = result && !this.failed
    return result
  }
}
