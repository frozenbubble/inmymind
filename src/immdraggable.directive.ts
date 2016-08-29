import { Directive, ElementRef, Renderer, HostListener, Input, Output, EventEmitter } from '@angular/core'; 
import { Position2D } from './notemodel';

@Directive({
    selector: '[imm-draggable]'
})
export class Draggable {
    constructor(private renderer: Renderer, private element: ElementRef) {
        this.target = element.nativeElement as HTMLElement;
    }
        
    private positionCache: Position2D[] = [];
    private target: HTMLElement;
    private _position: Position2D = {x: 0, y: 0};

    @Input('position')
    set position(pos: Position2D) {
        this._position = pos || this._position;
        console.log(this._position)
        this.move(this.target, this.position);
    }

    get position() {
        return this._position;
    }

    @Output() onmove = new EventEmitter<Position2D>();

    ngOnInit() {
        this.move(this.target, this.position);
    }

    // destructuring
    move(target: HTMLElement, pos: Position2D) {
        target.style.left = `${pos.x}px`;
        target.style.top = `${pos.y}px`;
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

        let newPosition = {
            x: event.clientX + offset.x,
            y: event.clientY + offset.y
        };

        this.move(this.target, newPosition);
        this.onmove.emit(newPosition);        

        event.preventDefault();
        return false;
    }
}