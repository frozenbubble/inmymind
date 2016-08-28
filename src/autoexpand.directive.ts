import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[autoExpand]'
})
export class AutoExpand
{
    constructor(public renderer: Renderer, public element: ElementRef) {}

    ngOnInit() {
        this.resize();
    }

    @HostListener('keyup')
    keyup() {
        this.resize();
    }

    resize () {
        this.renderer.setElementStyle(this.element.nativeElement, 'height', 
            this.element.nativeElement.scrollHeight);
        this.renderer.setElementStyle(this.element.nativeElement, 'width', 
            this.element.nativeElement.scrollWidth);
    }
}