import {Pipe} from '@angular/core';

@Pipe({name: 'where' })
export class WherePipe {
    transform(value, args) {
        if (value && value.length > 0 && args.length == 1) {
            return value.filter(item => item.input == args[0]);
        }
    }
}
