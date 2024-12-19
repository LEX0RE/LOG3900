import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LetterComponent } from '@app/components/letter/letter.component';
import { DEFAULT_FONT_SIZE, DEFAULT_LETTER_SIZE, INVISIBLE_BLANK, PIXEL_TO_VH } from '@app/constants/font-letter';
import { BLANK } from '@common/constants/blank';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

describe('LetterComponent', () => {
    let component: LetterComponent;
    let fixture: ComponentFixture<LetterComponent>;
    let letter: CommonLetter;
    let letterSize: number;
    let fontSize: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LetterComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(LetterComponent);
        component = fixture.componentInstance;
        letter = { letter: 'P', point: 3 };
        letterSize = DEFAULT_LETTER_SIZE;
        fontSize = DEFAULT_FONT_SIZE;
        component.letter = letter;
        component.letterSize = letterSize;
        component.fontSize = fontSize;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should handle blank letter', () => {
        component.letter = { letter: BLANK, point: 0 };
        expect(component.handleLetter()).toBe(INVISIBLE_BLANK);
    });

    it('should handle lowerCase letter', () => {
        component.letter = { letter: 'a', point: 3 };
        expect(component.handleLetter()).toBe('A');
    });

    it('styleTransform should return good font from input', () => {
        const size = 10;
        const expected: { font: string } = { font: `bold ${size / PIXEL_TO_VH}vh serif` };

        component.ngOnChanges();

        // eslint-disable-next-line dot-notation -- Méthode privée
        expect(component['styleTransform'](size)).toEqual(expected);
    });
});
