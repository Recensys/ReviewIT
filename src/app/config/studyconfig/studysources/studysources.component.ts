import { Component, OnInit } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';


@Component({
	moduleId: module.id,
	selector: 'app-studysources',
	templateUrl: 'studysources.component.html',
	styleUrls: ['studysources.component.css'],
})

export class StudysourcesComponent implements OnInit {

	public uploader: FileUploader = new FileUploader({url: 'https://evening-anchorage-3159.herokuapp.com/api/'});
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
