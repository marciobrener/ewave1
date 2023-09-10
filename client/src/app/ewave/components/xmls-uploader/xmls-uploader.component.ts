import {
  Component,
  Injectable,
  OnInit,
  Input,
  NgZone
} from '@angular/core'
import { SecurityComponent } from './../../security/security.component'
import { ExecuteItem } from './execute-item'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-xmls-uploader',
  templateUrl: './xmls-uploader.component.html',
  styleUrls: ['./xmls-uploader.component.css']
})

@Injectable()
export class XMLsUploaderComponent implements OnInit {
  readonly title = "Upload de arquivos XML"

  @Input() items: Map<string, ExecuteItem>

  constructor(public zone: NgZone) {
    this.items = new Map<string, ExecuteItem>()
  }

  ngOnInit(): void {
  }

  onFilesChange(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
        let file = files[i] as File
        if (this.items.has(file.name)) continue
        this.items.set(file.name, new ExecuteItem(file))
    }

    this.upload()
  }

  private hasNext(): boolean {
    if (this.items.size < 1) return false
    for (let item of this.items.values()) {
      if (item.ready) return true
    }
    return false
  }

  private next(): ExecuteItem {
    let item = this.items.values().next().value //DUMMY
    for (let item of this.items.values()) {
      if (item.ready) return item
    }
    return item
  }

  private upload(): void {
    if (!this.hasNext()) return

    const item = this.next()
    console.debug(`Processando: ${item.file.name}`)
    this.zone.run(() => item.uploading = true)

    let file = item.file
    let fileReader = new FileReader()
    fileReader.onload = (event) => {
      item.content = SecurityComponent.parseXMLAgentes(fileReader.result as string)
      const status = this.send(item)
      this.zone.run(() => item.setStatus(status))
      this.upload()
    }

    fileReader.readAsText(file)
  }

  private send(item: ExecuteItem): number {
    let request = new XMLHttpRequest()

    const url = `${environment.host}/xml`
    request.open("POST", url, false)
    request.setRequestHeader('Content-Type', 'application/xml; charset=utf-8')
    request.setRequestHeader('Access-Control-Allow-Origin', '*')
    request.setRequestHeader('Access-Control-Allow-Methods', 'POST')
    request.setRequestHeader('Accept', '*/*')
    request.setRequestHeader('Cache-Control', 'no-cache')
    //request.timeout = 5 * 60 * 1000
    //request.ontimeout = function () { alert("Timed out!!!"); }

    //request.onreadystatechange = (state) => {}

    request.send(item.content)
    return request.status
  }
}
