import { Component, Input} from "@angular/core";

@Component({
  selector: 'notifications',
  template: `
    <div class="container">
        <div class="" *ngFor="let m in messages">
            {{m}}
        </div>
    </div>
  `
})

export class NotificationsComponent {

    @Input() messages: string;

  constructor() {}

  

}

