import { Component, Input, OnChanges } from '@angular/core';
import { CONVERSION_FONT_SIZE_FILL_TEXT, INVISIBLE_BLANK, PIXEL_TO_VH } from '@app/constants/font-letter';
import { Font } from '@app/interface/font';
import { TileStyle } from '@app/interface/tile-styling';
import { BLANK } from '@common/constants/blank';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';
@Component({
    selector: 'app-letter',
    templateUrl: './letter.component.html',
    styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnChanges {
    @Input() letter: CommonLetter;
    @Input() letterSize: number;
    @Input() fontSize: number;
    currentStylesTile: TileStyle;
    currentStylesLetter: Font;
    currentStylesPoint: Font;

    handleLetter(): string {
        return this.letter.letter === BLANK ? INVISIBLE_BLANK : this.letter.letter.toUpperCase();
    }

    ngOnChanges(): void {
        this.currentStylesTile = {
            width: `${this.letterSize}vh`,
            height: `${this.letterSize}vh`,
        };
        this.handleLetterStyling();
    }

    private handleLetterStyling(): void {
        this.currentStylesLetter = this.styleTransform(this.fontSize);
        this.currentStylesPoint = this.styleTransform(this.fontSize / CONVERSION_FONT_SIZE_FILL_TEXT);
    }

    private styleTransform(size: number): { font: string } {
        return { font: `bold ${size / PIXEL_TO_VH}vh serif` };
    }
}
