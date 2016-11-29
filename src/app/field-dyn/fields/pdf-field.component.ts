
import { Component, Input, Pipe, PipeTransform, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'

import { FieldDTO, DataType, DataDTO } from '../../model/models'
import { FileUploader} from 'ng2-file-upload';
import { MessageService } from '../../core';
import { environment } from '../../../environments/environment';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
    selector: 'pdf-field',
    template: `
    <div *ngIf="requested">
        
       <div ng2FileDrop
            [ngClass]="{'nv-file-over': hasFileOverDrop}"
            (fileOver)="fileOverDrop($event)"
            [uploader]="uploader"
            class="my-drop-zone text-muted">
            <a class="btn btn-default" (click)="open()"><i [class.hasPdf]="data.Value" class="fa fa-file-pdf-o fa-3x" aria-hidden="true"></i></a>
            <p *ngIf="data.Value">This article already has a Pdf. Drag in a replacement or click the icon to open it</p>
            <p *ngIf="!data.Value">Drag pdf here</p>
            <span *ngIf="uploader.queue[0]?.isUploading"><i class="fa fa-spinner fa-pulse"></i></span>
        </div>
    </div>
    <div *ngIf="!requested">
        <object [data]="data.Value | safe" type="application/pdf">
            <p>It appears you don't have a PDF plugin for this browser.</p>
        </object>
    </div>
    `,
    styles: [
        '.hasPdf{ color: red; }',
        'fa-file-pdf-o:hover{ color: black }'
    ]
})
export class PdfFieldComponent implements OnInit {

    @Input() data: DataDTO;
    @Input() field: PdfField;
    @Input() requested: Boolean;

    public obs: any;

    public uploader: MyUploader;
	public hasFileOverDrop: boolean = false;

	constructor(
		private msg: MessageService,
        private router: Router
	) { }


    ngOnInit() {
            var url = `${environment.api}resource/${this.data.Id}/upload`;
            this.uploader = new MyUploader({
                url: url, 
                queueLimit: 1,
                maxFileSize: 5000000, //5mb
                autoUpload: true,
                allowedFileType: ['pdf'],
                removeAfterUpload: true
            });

            this.uploader.onWhenAddingFileFailed = (file, filter, options) => {
                switch(filter.name){
                    case "fileSize" :
                        this.msg.addError("The file is too big. Max file size is 1 mb");
                        console.log("The file is too big. Max file size is 1 mb");
                        break;
                    case "fileType" :
                        this.msg.addError("Only Pdf's are allowed");
                        console.log("Only Pdf's are allowed");
                        break;
                }
            }

            this.uploader.onSuccessItem = (file, res, status, headers) => {
                this.msg.addSuccess('Pdf updated!');
            }

    }

    open(){
        window.location.href = environment.blob+this.data.Value;
    }

    public fileOverDrop(e: any): void {
		this.hasFileOverDrop = e;
	}

}

class MyUploader extends FileUploader {
  onAfterAddingFile(file: any) {
    file.withCredentials = false;
  }
}

export class PdfField implements FieldDTO{
	Id: number;
    Name: string;
	DataType: DataType = DataType.Pdf;
}