import { Component, Input } from 'angular2/core';

import { Category } from './notemodel'

@Component({
    selector: 'categories',
    template: `
        <div class="categories-tabbar">
            <ul class="nav nav-tabs">
                <li role="presentation" class="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>
        </div>`
})
export class CategoriesComponent {
    @Input() categories: Category[];
}