import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { DragAndDropManager } from '@app/services/drag-drop-manager/drag-drop-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-blank-form-overlay',
    templateUrl: './blank-form-overlay.component.html',
    styleUrls: ['./blank-form-overlay.component.scss'],
})
export class BlankFormOverlayComponent {
    error: string;
    form: FormGroup;
    translationsContainer: TranslateContainer;
    private formBuilder: FormBuilder;
    private readonly dragAndDropManager: DragAndDropManager;

    get isOpen(): boolean {
        return this.dragAndDropManager.isBlankFormOverlayOpen;
    }

    constructor(dragAndDropManager: DragAndDropManager, translate: TranslateService, formBuilder: FormBuilder) {
        this.dragAndDropManager = dragAndDropManager;
        this.formBuilder = formBuilder;
        this.translationsContainer = new TranslateContainer(translate, ['submit', 'enterBlankLetter']);
        this.error = '';
        this.form = this.formBuilder.group({
            letter: ['', { validators: [Validators.required, Validators.pattern('[A-z]$')], updateOn: 'change' }],
        });
    }

    onSubmit(): void {
        this.dragAndDropManager.onBlankFormOverlayClosed(this.form.value.letter[0]);
    }
}
