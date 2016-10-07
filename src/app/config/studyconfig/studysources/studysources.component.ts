import { Component, OnInit, Input } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';

import { MessageService } from '../../../core';

@Component({
	
	selector: 'app-studysources',
	templateUrl: 'studysources.component.html',
	styleUrls: ['studysources.component.css'],
})

export class StudysourcesComponent implements OnInit {

	@Input() studyId: number;

	public uploader: MyUploader;
	public hasFileOverDrop: boolean = false;

	constructor(private msg: MessageService) { }

	ngOnInit() {
		console.log(this.studyId);
		if(this.studyId != undefined){
			var url = `${environment.api}study/${this.studyId}/config/source`;
			this.uploader = new MyUploader({
				url: url, 
				queueLimit: 5,
				maxFileSize: 1000000 //1mb
			});

			this.uploader.onWhenAddingFileFailed = (file, filter, options) => {
				switch(filter.name){
					case "queueLimit" :
						this.msg.addError("Too many items in upload");
						console.log("Too many items in upload");
						break;
					case "fileSize" :
						this.msg.addError("The file is too big. Max file size is 1 mb");
						console.log("The file is too big. Max file size is 1 mb");
						break;
				}
			}

			this.uploader.onSuccessItem = (file, res, status, headers) => {
				// file.formData.
				// console.log(file);
			}
		}
		
	}

	public fileOverDrop(e: any): void {
		this.hasFileOverDrop = e;
	}

	public log(e: any) {
		console.log(e);
	}
}

class MyUploader extends FileUploader {
  onAfterAddingFile(file: any) {
    file.withCredentials = false;
	file['articles'];
  }
}
