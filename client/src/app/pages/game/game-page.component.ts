import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent {
    private readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    get isObservationPage(): boolean {
        return /observe/.test(this.router.url);
    }
}
