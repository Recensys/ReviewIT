import {Pipe} from 'angular2/core';
@Pipe({ name: 'filter' })
export class FilterPipe {
    transform(value, args) {
        if(value && value.length > 0 && args.length == 1) return value.filter(item => item.input == args[0]);
    }
}
