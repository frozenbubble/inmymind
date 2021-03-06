import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: '[newInput]'
})
export class NewInput
{
    constructor(public renderer: Renderer, public elementRef: ElementRef) {}

    ngOnInit () {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    }
}