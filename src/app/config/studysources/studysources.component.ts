import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { FileUploader} from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

import { MessageService } from '../../core';

@Component({
	
	selector: 'app-studysources',
	templateUrl: 'studysources.component.html',
	styleUrls: ['studysources.component.css'],
})

export class StudysourcesComponent implements OnInit {

	public uploader: MyUploader;
	public hasFileOverDrop: boolean = false;

	constructor(
		private msg: MessageService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.parent.params.forEach((params: Params) => {
			let studyId = +params['id'];
			if(studyId != undefined){
				var url = `${environment.api}study/${studyId}/config/source`;
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
					file['articles'] = res;
					this.msg.addSuccess(res+' articles added');
				}
			}
		});
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
