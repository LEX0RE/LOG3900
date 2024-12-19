import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-hint-element',
    templateUrl: './hint-element.component.html',
    styleUrls: ['./hint-element.component.scss'],
})
export class HintElementComponent {
    @Input() hint: string;
    @Input() isSelected: boolean;
}
