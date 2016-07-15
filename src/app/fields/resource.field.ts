/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field.model';

export class ResourceField implements Field {

    name: string;
    input: boolean;
    type: string = 'resource';

    constructor(data) {
        this.name = data.name;
        this.input = data.input;
    }

    getView() {
        return 'app/fields/resource.field.html';
    }

}
