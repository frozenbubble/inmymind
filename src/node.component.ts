import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgModel, FORM_DIRECTIVES } from '@angular/common';
import { AutoExpand } from './autoexpand.directive'
import { Node } from './notemodel'
import { Draggable } from './immdraggable.directive'

let marked = require('marked');

enum Mode {
    Edit, Object
}

@Component({
    selector: 'node',
    directives: [NgSwitch, NgSwitchCase, FORM_DIRECTIVES, AutoExpand, Draggable],
    template: `
        <div class="node" draggable="true" (click)="select($event)"
            (mouseenter)="showButtons(true)" (mouseleave)="showButtons(false)"
            imm-draggable [position]="content.position" (onmove)="onmove($event)" >

            <div *ngIf="displayButtons" class="buttons" >
                <span [ngSwitch]="mode">
                    <a *ngSwitchCase="Mode.Object" (click)="edit()">edit</a>
                    <a *ngSwitchCase="Mode.Edit" (click)="finishEdit()">finish</a>
                </span>

                <a (click)="delete()">delete</a>
            </div>

            <div [ngSwitch]="mode">
                <div *ngSwitchCase="Mode.Object" class="node-content" [innerHTML]="renderContent()"></div>
                <div *ngSwitchCase="Mode.Edit">
                    <textarea wrap="off" [(ngModel)]="content.content" autoExpand></textarea>
                </div>
            </div>
            
        </div>`
})
export class NodeComponent
{
    Mode = Mode;
    @Input() content: Node = new Node();
    @Output() deleteNode = new EventEmitter();

    private displayButtons = false;
    private mode: Mode = Mode.Object;

    select(event: MouseEvent) {
        console.log(event.pageX);
    }

    renderContent() {
        return marked(this.content.content);
    }

    showButtons(show: boolean) {
        this.displayButtons = show;
    }

    edit() {
        this.mode = Mode.Edit;
    }

    delete () {

    }

    finishEdit() {
        this.mode = Mode.Object;
    }

    onmove(position){
        this.content.position = position;
    }
}