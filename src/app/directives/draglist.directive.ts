/**
 * Created by jbec on 13/07/2016.
 */
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

let Sortablejs = {
  Sortable: require('sortablejs')
};

@Directive({ selector: '[draglist]' })

export class DraglistDirective implements OnInit, OnDestroy{

  @Input('draglist')
  private _items: any[];
  private _sortable: Sortablejs.Sortable;


  constructor(private el: ElementRef) {}

  private _options = {
    filter: ".list-group-item-header",
    group: "fields",
    onAdd: evt => {
      this._items.splice(evt.newIndex-1,0,evt.item.innerHTML);
    },
    onRemove: evt => {
      this._items.splice(evt.oldIndex-1,1);
    },
    onUpdate: evt => {
      this._items.splice(evt.newIndex-1, 0, this._items.splice(evt.oldIndex-1, 1)[0]);
    },
    onMove: evt => {
      if(evt.related.classList.contains("list-group-item-header")){
        return false;
      }
    }
  };

  ngOnInit(){
    this._sortable = new Sortablejs.Sortable(this.el.nativeElement, this._options);
  }

  ngOnDestroy(){
    this._sortable.destroy();
  }
}
