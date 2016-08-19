import { Injectable } from '@angular/core';

import { Growl, Message } from 'primeng/primeng';

@Injectable()
export class MessageService {

    constructor(){}

    msgs: Message[] = [];

    addMessage(msg: Message){
        this.msgs.push(msg);
    }
}