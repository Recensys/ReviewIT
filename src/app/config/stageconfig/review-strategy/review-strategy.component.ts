import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../core';
import { Message } from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'app-review-strategy',
	templateUrl: 'review-strategy.component.html',
	styleUrls: ['review-strategy.component.css'],
	providers: [],
})

export class ReviewStrategyComponent {

	public model2 = 'mooooodel2';

	results: any[];
	msgs: Message[] = [];

	search(event) {
		this.results = this.researchers
		.filter(user => user.Name.indexOf(event.query) >= 0);
	}

	handleDropdown(event) {
		this.results = [];
		this.results = this.researchers;
	}

	onSelectedResearcherChanged(event) {
		this.onPresetChange();
	}

	presets: any[] = [
		{ Id: 0, Name: 'Equal Distribution' },
		{ Id: 1, Name: 'Full Overlap' },
		{ Id: 2, Name: 'Custom' }
	];

	researchers: any[] = [
		{ Id: 0, Name: 'Mathias', Range: [0, 0] },
		{ Id: 1, Name: 'Jacob', Range: [0, 0] },
		{ Id: 2, Name: 'Paolo', Range: [0, 0] }
	];

	selectedResearchers: any[] = [];

	coverage: number[][] = [];
	coveragePercent: number = 0;

	selectedPreset: any;

	constructor(private _api: APIService, private _messages: MessageService) {
		if (this.selectedPreset === undefined) {
			this.selectedPreset = this.presets[0];
		}
		this.onPresetChange();
	}

	onPresetChange() {
		if (this.selectedPreset.Id === 0) {
			let rest = 100;
			let last = 0;
			let n = this.selectedResearchers.length;

			for (let researcher of this.selectedResearchers){
				let share = Math.floor(rest / n);

				researcher.Range = [last, last + share];

				last += share;
				rest -= share;
				n -= 1;
			}
		} else if (this.selectedPreset.Id === 1) {
			for (let researcher of this.selectedResearchers){
				researcher.Range = [0, 100];
			}
		}
		this.updateRanges();
	}

	onRangeChange() {
		this.updateRanges();
		this.selectedPreset = this.presets[2];
	}

	updateRanges() {

		let coverage: Array<number> = new Array<number>(100);

		for (let i = 0; i < coverage.length; i++) coverage[i] = 0;

		for (let researcher of this.selectedResearchers) {
			let min = researcher.Range[0];
			let max = researcher.Range[1];
			for (let i = min; i < max; i++) coverage[i]++;
		}

		this.coverage = [];

		let start = 0;
		let width = 0;


		for (let i = 0; i < coverage.length; i++) {

			let last = i > 0 ? coverage[i - 1] > 0 : 0;
			let current = coverage[i] > 0;

			if (last && current) width++;
			if (last && !current || (i === coverage.length - 1 && width !== 0)) {
				this.coverage.push([start, width + 1]);
				width = 0;
			}
			if (!current) start = i + 1;
		}

		this.coveragePercent = 0;
		for (let i = 0; i < coverage.length; i++) {
			if (coverage[i] > 0) this.coveragePercent++;
		}
	}

	isValid: boolean = false;

	checkIfValid(): boolean {

		/* Clears messages */
		this.msgs = [];

		if (this.selectedResearchers.length <= 0) {
			this.msgs.push({
				severity: 'warn',
				summary: 'No researchers added',
				detail: 'There must be at least one researcher in a strage.'
			});
		} else if (this.coveragePercent < 100) {
			this.msgs.push({
				severity: 'warn',
				summary: 'Invalid distribution',
				detail: 'The coverage percentage of a review strategy must be 100%.'
			});
		}

		return (this.isValid = this.msgs.length <= 0);
	}

	save() {
	}
}
