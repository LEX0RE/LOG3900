/* eslint-disable dot-notation -- Propriété/Méthode privée*/
import { DEFAULT_DEBOUNCE_TIME } from '@app/constants/utils';
import { DebounceKeyPressedDirective } from '@app/directives/debounce/keyboard/debounce-key-pressed.directive';
import { DO_NOTHING } from '@app/test/constants/do-nothing-function';
import { MockElementRef } from '@app/test/mocks/element-ref-mock';

describe('DebounceKeyPressedDirective', () => {
    let directive: DebounceKeyPressedDirective;
    let ref: MockElementRef;

    beforeEach(() => {
        ref = new MockElementRef();
        directive = new DebounceKeyPressedDirective(ref);
        directive.ngOnInit();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('ngOnInit should add subscription', () => {
        expect(directive['subscription']).toBeTruthy();
    });

    it('ngOnDestroy should unsubscribe', () => {
        const spy = spyOn(directive['subscription'], 'unsubscribe').and.callFake(DO_NOTHING);

        directive.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
    });

    it('should add the keydown after debounce time', () => {
        const clock = jasmine.clock().install();
        const spy = spyOn(directive.debouncedKeyDown, 'emit').and.callFake(DO_NOTHING);

        directive['isFocus'] = true;

        directive.keyDownEvent(new KeyboardEvent('keydown'));
        clock.tick(DEFAULT_DEBOUNCE_TIME);
        expect(spy).toHaveBeenCalled();
        clock.uninstall();
    });

    it('should do nothing if it is not on focus', () => {
        const clock = jasmine.clock().install();
        const spy = spyOn(directive.debouncedKeyDown, 'emit').and.callFake(DO_NOTHING);

        directive.keyDownEvent(new KeyboardEvent('keydown'));
        clock.tick(DEFAULT_DEBOUNCE_TIME);
        expect(spy).not.toHaveBeenCalled();
        clock.uninstall();
    });

    it('should get focus when rightClick is inside the host element', () => {
        ref.nativeElement.children[0].contains.and.returnValue(true);
        directive.onRightClick(new Event('contextmenu'));

        expect(directive['isFocus']).toBeTrue();
    });

    it('should remove focus when rightClick is outside the host element', () => {
        ref.nativeElement.children[0].contains.and.returnValue(false);

        directive['isFocus'] = true;
        directive.onRightClick(new Event('contextmenu'));

        expect(directive['isFocus']).toBeFalse();
    });

    it('should get focus when click is inside the host element', () => {
        ref.nativeElement.children[0].contains.and.returnValue(true);
        directive.onClick(new Event('click'));

        expect(directive['isFocus']).toBeTrue();
    });

    it('should remove focus when click is outside the host element', () => {
        ref.nativeElement.children[0].contains.and.returnValue(false);

        directive['isFocus'] = true;
        directive.onClick(new Event('click'));

        expect(directive['isFocus']).toBeFalse();
    });
});
