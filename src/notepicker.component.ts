import { Component, Input, Output, EventEmitter, ViewChild, Directive, Renderer, ElementRef } from 'angular2/core';
import { Category, Map } from './notemodel';

@Directive({
    selector: 'input'
})
export class NewInput
{
    constructor(public renderer: Renderer, public elementRef: ElementRef) {}

    ngOnInit () {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    }
}


@Component({
    selector: 'notepicker',
    directives: [NewInput],
    template: `
        <nav class="nav-group" (mouseenter)="showAdd(true)" (mouseleave)="showAdd(false)">
            <h5 class="nav-group-title category-title" (click)="toggle($event)">
                <span class="icon" [class.icon-down-open]="opened" [class.icon-right-open]="!opened"></span>
                    {{category.title}}
                <span *ngIf="inFocus" (click)="addMap($event)" class="icon icon-plus-circled pull-right picker-button"></span>
            </h5>
            <div *ngIf="opened">
                <span *ngIf="addingNewElement" class="nav-group-item" [class.active]="addingNewElement">
                    <input type="text" class="map-name-input" (focusout)="create($event, false)" (keyup.enter)="create($event, true)"/>
                </span>
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

    @ViewChild('fTarget') fTarget: HTMLInputElement;
    
    private opened: boolean = false;
    private inFocus = false;
    private addingNewElement: boolean = false;

    select(m: Map) {
        this.selectedMap = m;
        this.onSelect.emit(m);
        console.log(m);
    }

    toggle(event: MouseEvent) {
        this.opened = !this.opened;
    }

    showAdd(value: boolean) {
        this.inFocus = value;
    }

    addMap(event: MouseEvent) {
        event.stopPropagation();
        this.opened = true;
        this.addingNewElement = true;
    }

    create(event, accept: boolean) {
        this.addingNewElement = false;
        
        if (accept) {
            let newMap = new Map();
            newMap.title = event.target.value;
            newMap.id = this.generateId();

            this.category.maps.push(newMap);
            this.category.maps.sort((a: Map, b: Map) => {
                return (a.title < b.title) ? (-1) : 1;
            });
        }
    }

    generateId() {
        let S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };

        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

}