import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { InputBoxComponent } from '@app/components/chat/input-box/input-box.component';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { DO_NOTHING } from '@app/test/constants/do-nothing-function';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';
import { MESSAGE } from '@common/constants/communication';

describe('InputBoxComponent', () => {
    let component: InputBoxComponent;
    let fixture: ComponentFixture<InputBoxComponent>;
    let easel: jasmine.SpyObj<EaselSelectionService>;
    const smallText = 'Des lettres';

    beforeEach(async () => {
        easel = mockEaselSelectionService();
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), FormsModule],
            declarations: [InputBoxComponent],
            providers: [{ provide: EaselSelectionService, useValue: easel }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.textToSend = smallText;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear input after it is sent', () => {
        const expected = '';

        component.onEnter({} as Event);
        expect(component.textToSend).toBe(expected);
    });

    it('pressing enter should call onEnter', () => {
        const spy = spyOn(component, 'onEnter');
        const inputBox = fixture.debugElement.query(By.css('input'));

        inputBox.triggerEventHandler('keyup.enter', null);

        expect(spy).toHaveBeenCalled();
    });

    it('onEnter should call sendToServer if message is not empty', () => {
        const spy = spyOn(component.chatBoxService, 'sendToServer');
        const testMessage = 'test';

        component.textToSend = testMessage;
        component.onEnter({} as Event);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(MESSAGE, testMessage);
    });

    it('onEnter should not call sendToServer if message is empty', () => {
        const spy = spyOn(component.chatBoxService, 'sendToServer');
        const testMessage = '';

        component.textToSend = testMessage;
        component.onEnter({} as Event);

        expect(spy).not.toHaveBeenCalled();
    });

    it('handleHideEaselLetters should call selectHiddenByString for letter', () => {
        const event: { stopPropagation: () => void } = { stopPropagation: DO_NOTHING };

        component.textToSend = '!placer h8h james';
        // eslint-disable-next-line dot-notation -- Méthode privée
        component['handleHideEaselLetters'](event as Event);
        expect(easel.selectHiddenByString).toHaveBeenCalled();
    });
});
