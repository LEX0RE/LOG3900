import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DEFAULT_DEBOUNCE_TIME } from '@app/constants/utils';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Source : https://stackoverflow.com/questions/51390476/how-to-prevent-double-click-in-angular
 * Cas d'utilisation :
 * <button appDebounceClick (debounceEvent)="log()" [debounceTime]="700">Debounced Click</button>
 */
@Directive({
    selector: '[appDebounceClick]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
    @Input()
    debounceTime: number;

    @Output()
    debounceClick: EventEmitter<Event>;

    private events: Subject<Event>;
    private subscription: Subscription;

    constructor() {
        this.debounceTime = DEFAULT_DEBOUNCE_TIME;
        this.debounceClick = new EventEmitter();
        this.events = new Subject();
    }

    @HostListener('click', ['$event'])
    clickEvent(event: Event): void {
        event.preventDefault();
        this.events.next(event);
    }

    ngOnInit(): void {
        this.subscription = this.events.pipe(debounceTime(this.debounceTime)).subscribe((event) => this.debounceClick.emit(event));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
