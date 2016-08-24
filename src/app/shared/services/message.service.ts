import { Injectable } from '@angular/core';

import { Growl, Message } from 'primeng/primeng';

@Injectable()
export class MessageService {

    constructor(){}

    msgs: Message[] = [];

    addInfo(msg: string) {
        this.msgs.push({severity: 'info', summary: 'Error!', detail: msg});
    }

    addWarning(msg: string) {
        this.msgs.push({severity: 'warn', summary: 'Warning', detail: msg});
    }

    addError(msg: string) {
        this.msgs.push({severity: 'error', summary: 'Info:', detail: msg});
    }
}