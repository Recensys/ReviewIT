import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api.service';
import {COMMON_DIRECTIVES} from '@angular/common';

@Component({
	moduleId: module.id,
	selector: 'app-review-strategy',
	templateUrl: 'review-strategy.component.html',
	styleUrls: ['review-strategy.component.css'],
	providers: [],
	directives: [COMMON_DIRECTIVES]
})

export class ReviewStrategyComponent {

	public model2 = 'mooooodel2';

	presets: any[] = [
		{ Id: 0, Name: 'Equal Distribution' },
		{ Id: 1, Name: 'Full Overlap' },
		{ Id: 2, Name: 'Custom' }
	];

	researchers: any[] = [
		{ Id: 0, Name: 'Mathias', Range: [0, 100] },
		{ Id: 1, Name: 'Jacob', Range: [0, 100] },
		{ Id: 2, Name: 'Paolo', Range: [0, 100] }
	];

	rangeValues: number[] = [0, 100];

	selectedPreset: any;

	constructor(private _api: APIService) {
		if (this.selectedPreset === undefined) {
			this.selectedPreset = this.presets[0];
		}
		this.onPresetChange();
	}

	onPresetChange() {
		if (this.selectedPreset.Id === 0) {
			let rest = 100;
			let last = 0;
			let n = this.researchers.length;

			for (let researcher of this.researchers){
				let share = Math.floor(rest / n);

				researcher.Range = [last, last + share];

				last += share;
				rest -= share;
				n -= 1;
			}
			this.updateRanges();
		} else if (this.selectedPreset.Id === 1) {
			for (let researcher of this.researchers){
				researcher.Range = [0, 100];
			}
			this.updateRanges();
		}
	}

	onRangeChange() {
		this.updateRanges();
		this.selectedPreset = this.presets[2];
	}

	updateRanges() {
		let c: boolean[] = [];
		for (let researcher of this.researchers) {
			let min = researcher.Range[0];
			let max = researcher.Range[1];
			for (let i = min; i < max; i++) c[i] = true;
		}

		let count = 0;
		for (let i = 0; i < c.length; i++) {
			if (c[i]) count++;
		}

		this.rangeValues = [0, count];
	}
}
