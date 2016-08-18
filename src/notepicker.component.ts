import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { Category, Map } from './notemodel';

/* 
    most of what's in notepicker could also go to top level component
    and there could be an ngFor for all the categories 
*/ 
@Component({
    selector: 'notepicker',
    template: `
        <nav class="nav-group" (mouseenter)="showAdd(true)" (mouseleave)="showAdd(false)">
            <h5 class="nav-group-title category-title" (click)="toggle($event)">
                <span class="icon" [class.icon-down-open]="opened" [class.icon-right-open]="!opened"></span>
                    {{category.title}}
                <span *ngIf="inFocus" (click)="addMap($event)" class="icon icon-plus-circled pull-right picker-button"></span>
            </h5>
            <div *ngIf="opened">
                <span class="nav-group-item" (click)="select(m)" *ngFor="let m of category.maps" [class.active]="m.id === selectedMap.id">
                    {{m.title}}
                </span>
            </div>
        </nav>`
})
export class NotePickerComponent {
    @Input() category: Category;
    @Input() selectedMap: Map = new Map();
    @Output() onSelect = new EventEmitter<Map>();
    @Output() onNewMap = new EventEmitter<Map>();
    
    private opened: boolean = false;
    private inFocus = false;

    select(m: Map) {
        this.selectedMap = m;
        this.onSelect.emit(m);
        console.log(m);
    }

    toggle(event: MouseEvent) {
        let target = event.target as Element;

        if (!target.className.includes('picker-button')) {
            this.opened = !this.opened;
        } else {
            this.opened = true;
            // target.parentElement.appendChild
        }

        

    }

    showAdd(value: boolean) {
        this.inFocus = value;
    }

    addMap(event: MouseEvent) {
        // event.stopPropagation();
        // this.opened = true;

        // let target = event.target as Element;       
        // console.log(target.className);
    }
}