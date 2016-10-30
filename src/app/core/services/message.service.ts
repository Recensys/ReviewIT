import { Injectable } from '@angular/core';

import { Growl, Message } from 'primeng/primeng';

@Injectable()
export class MessageService {

    constructor(){}

    msgs: Message[] = [];

    addSuccess(msg: string) {
        this.msgs.push({severity: 'success', summary: 'Success!', detail: msg});
    }

    addInfo(msg: string) {
        this.msgs.push({severity: 'info', summary: 'Info', detail: msg});
    }

    addWarning(msg: string) {
        this.msgs.push({severity: 'warn', summary: 'Warning', detail: msg});
    }

    addError(msg: string) {
        this.msgs.push({severity: 'error', summary: 'Error!', detail: msg});
    }
}