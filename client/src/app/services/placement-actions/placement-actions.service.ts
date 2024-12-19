import { Injectable } from '@angular/core';

export enum PlacementActions {
    ClickAndKeyBoard,
    DragAndDrop,
    None,
}

@Injectable({
    providedIn: 'root',
})
export class PlacementActionsService {
    private placementActions: PlacementActions;
    private lock: boolean;

    constructor() {
        this.placementActions = PlacementActions.ClickAndKeyBoard;
        this.lock = false;
    }

    acquiredLock(type: PlacementActions): boolean {
        if (this.placementActions === type) return true;
        if (this.lock) return false;

        this.lock = true;
        this.placementActions = type;
        return true;
    }

    releaseLock(): void {
        this.lock = false;
        this.placementActions = PlacementActions.None;
    }

    get isClickAndKeyBoard(): boolean {
        return this.placementActions === PlacementActions.ClickAndKeyBoard;
    }

    get isDragAndDrop(): boolean {
        return this.placementActions === PlacementActions.DragAndDrop;
    }

    get isNone(): boolean {
        return this.placementActions === PlacementActions.None;
    }
}
