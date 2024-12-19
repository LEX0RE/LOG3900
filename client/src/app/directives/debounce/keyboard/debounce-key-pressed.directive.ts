import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DEFAULT_DEBOUNCE_TIME } from '@app/constants/utils';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[appDebounceKeyPressed]',
})
export class DebounceKeyPressedDirective implements OnInit, OnDestroy {
    @Input()
    debounceTime: number;

    @Output()
    debouncedKeyDown: EventEmitter<KeyboardEvent>;

    @Output()
    focusOut: EventEmitter<Event>;

    private events: Subject<KeyboardEvent>;
    private subscription: Subscription;
    private isFocus: boolean;
    private elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.debounceTime = DEFAULT_DEBOUNCE_TIME;
        this.debouncedKeyDown = new EventEmitter();
        this.focusOut = new EventEmitter();
        this.events = new Subject();
        this.isFocus = false;
    }

    @HostListener('window:keydown', ['$event'])
    keyDownEvent(event: KeyboardEvent): void {
        if (!this.isFocus) return;
        event.preventDefault();
        event.stopPropagation();
        this.events.next(event);
    }

    @HostListener('document:contextmenu', ['$event'])
    onRightClick(event: Event): void {
        this.getFocus(event);
    }

    @HostListener('document:click', ['$event'])
    onClick(event: Event): void {
        this.getFocus(event);
    }

    ngOnInit(): void {
        this.subscription = this.events.pipe(debounceTime(this.debounceTime)).subscribe((event) => this.debouncedKeyDown.emit(event));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getFocus(event: Event): void {
        let touched = false;

        for (const child of this.elementRef.nativeElement.children) {
            if (child.contains(event.target)) touched = true;
        }
        this.isFocus = touched;
        if (!touched) this.focusOut.emit();
        event.stopPropagation();
    }
}
