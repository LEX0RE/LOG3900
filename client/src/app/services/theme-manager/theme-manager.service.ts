import { Injectable } from '@angular/core';
import { DARK_COLORS, DEFAULT_COLORS, UNDER_THE_SEA_COLORS } from '@app/constants/grid-style';
import { DARK_STYLE } from '@app/constants/themes/dark';
import { DEFAULT_STYLE } from '@app/constants/themes/default';
import { UNDER_THE_SEA_STYLE } from '@app/constants/themes/under-the-sea';
import { GridThemeStyle, ThemeStyle } from '@app/interface/theme-style';

@Injectable({
    providedIn: 'root',
})
export class ThemeManagerService {
    currentGridStyle: GridThemeStyle;
    private currentTheme: string;
    private themeWrapper = document.querySelector('body');

    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'default';
        this.overrideCSSProperties(this.currentTheme);
    }

    overrideCSSProperties(themeType: string): void {
        const stylesheet = this.themeWrapper?.style;
        let styles: ThemeStyle;

        if (themeType === 'Dark') {
            styles = DARK_STYLE;
        } else if (themeType === 'UnderTheSea') {
            styles = UNDER_THE_SEA_STYLE;
        } else {
            styles = DEFAULT_STYLE;
        }
        if (stylesheet) {
            Object.entries(styles).forEach(([prop, val]) => {
                stylesheet.setProperty(prop, val);
            });
        }
        this.currentTheme = themeType;
        this.changeGridStyle();
        localStorage.setItem('theme', themeType);
    }

    private changeGridStyle(): void {
        if (this.currentTheme === 'Dark') {
            this.currentGridStyle = DARK_COLORS;
        } else if (this.currentTheme === 'UnderTheSea') {
            this.currentGridStyle = UNDER_THE_SEA_COLORS;
        } else {
            this.currentGridStyle = DEFAULT_COLORS;
        }
    }
}
