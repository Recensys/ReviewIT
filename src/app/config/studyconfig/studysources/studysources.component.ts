import { Component, OnInit, Input } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';

@Component({
	
	selector: 'app-studysources',
	templateUrl: 'studysources.component.html',
	styleUrls: ['studysources.component.css'],
})

export class StudysourcesComponent implements OnInit {

	@Input() studyId: number;

	public uploader: MyUploader;
	public hasFileOverDrop: boolean = false;

	constructor() { }

	ngOnInit() {
		console.log(this.studyId);
		if(this.studyId != undefined){
			var url = `${environment.api}study/${this.studyId}/config/source`;
			this.uploader = new MyUploader({url: url});
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
  }
}
