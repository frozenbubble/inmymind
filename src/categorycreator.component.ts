import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category, Map } from './notemodel';

@Component({
    selector: 'category-creator',
    template: `
        <nav class="nav-group">
            <h5 class="nav-group-title category-title">
                <span class="icon icon-plus-circled picker-button" (click)="addCategory()"></span>
                <span *ngIf="!addingCategory">
                    Add category
                </span>
                <span *ngIf="addingCategory">
                    <input newInput type="text" class="map-name-input" (focusout)="create($event, false)" (keyup.enter)="create($event, true)"/>
                </span>
            </h5>
        </nav>`
})
export class CategoryCreatorComponent {
    addingCategory: boolean = false;

    @Output() oncreate = new EventEmitter<Category>();

    create(event, accept:boolean) {
        this.addingCategory = false;

        if(accept) {
            let c = new Category();
            c.title = event.target.value;
            this.oncreate.emit(c);
        }
    }

    addCategory() {
        this.addingCategory = true;
    }
}