/* eslint-disable dot-notation -- pour accès aux membres privés*/
import { TestBed } from '@angular/core/testing';
import { ThemeManagerService } from '@app/services/theme-manager/theme-manager.service';

describe('ThemeManagerService', () => {
    let service: ThemeManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThemeManagerService],
        }).compileComponents();
        service = TestBed.inject(ThemeManagerService);
    });

    beforeEach(() => {
        localStorage.clear();
    });

    it('should be created', () => expect(service).toBeTruthy());

    it('currentTheme should be default when localStorage is empty', () => {
        expect(service['currentTheme']).toBe('default');
    });

    it('overrideCSSProperties should change localStorage', () => {
        const theme = 'dark';
        const storageSpy = spyOn(localStorage, 'setItem');

        service['overrideCSSProperties'](theme);
        expect(service['themeWrapper']?.style[0]).toEqual('--button-color');
        expect(service['currentTheme']).toBe('dark');
        expect(storageSpy).toHaveBeenCalled();
    });

    it('overrideCSSProperties should change currentTheme', () => {
        const theme = 'under the sea';
        const storageSpy = spyOn(localStorage, 'setItem');

        service['overrideCSSProperties'](theme);
        expect(service['themeWrapper']?.style[0]).toEqual('--button-color');
        expect(service['currentTheme']).toBe('under the sea');
        expect(storageSpy).toHaveBeenCalled();
    });
});
