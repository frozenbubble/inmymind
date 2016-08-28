import { Directive, ElementRef, Renderer, HostListener, Input, Output } from '@angular/core'; 
import { Position2D } from './notemodel';

@Directive({
    selector: '[imm-draggable]'
})
export class Draggable {
    constructor(private renderer: Renderer, private element: ElementRef) {
        this.target = element.nativeElement as HTMLElement;
    }
        
    private positionCache: any[] = [];
    private target: HTMLElement;
    private _position: Position2D = {x: 0, y: 0};

    @Input('position')
    set position(pos: Position2D) {
        this.move(this.target, pos.x, pos.y);
    }

    get position() {
        return this._position;
    }

    ngOnInit() {
        this.move(this.target, this.position.x, this.position.y);
    }

    // destructuring
    move(target: HTMLElement, x: number, y: number) {
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    @HostListener('dragstart', ['$event'])
    drag(event: MouseEvent) {
        let style = this.target.style;
        console.log(style);
        
        this.positionCache.push({
            x: parseInt(style.left, 10) - event.clientX,
            y: parseInt(style.top ,10) - event.clientY
        });
    }

    @HostListener('dragend', ['$event'])
    dragend(event: DragEvent) {
        let offset = this.positionCache.pop(); //destructuring
        console.log(offset);

        this.target.style.left = (event.clientX + parseInt(offset.x,10)) + 'px';
        this.target.style.top = (event.clientY + parseInt(offset.y,10)) + 'px';

        event.preventDefault();
        return false;
    }
}