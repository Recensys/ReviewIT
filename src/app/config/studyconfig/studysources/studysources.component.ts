import { Component, OnInit, Input } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import Globals = require('../../../shared/globals');

@Component({
	moduleId: module.id,
	selector: 'app-studysources',
	templateUrl: 'studysources.component.html',
	styleUrls: ['studysources.component.css'],
})

export class StudysourcesComponent implements OnInit {

	@Input() studyId: number;

	private url = `${Globals.api}study/${this.studyId}/config/source`;
	public uploader: FileUploader = new FileUploader({url: this.url});
	public hasFileOverDrop: boolean = false;

	constructor() { }

	ngOnInit() {
		
	}

	public fileOverDrop(e: any): void {
		this.hasFileOverDrop = e;
	}

	public log(e: any) {
		console.log(e);
	}
}
