/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';

export class ResourceField implements Field {

    

    constructor(name: string, input: boolean) {
        this.Name = name;
        this.Input = input;
    }

    Name: string;
    Input: boolean;
    Type: string = 'resource';

    getView() {
        return 'app/fields/resource.field.html';
    }

}
