import { TranslateService } from '@ngx-translate/core';

export class TranslateContainer {
    private translateService: TranslateService;
    private translations: Map<string, string>;

    constructor(translateService: TranslateService, keys: string[]) {
        this.translateService = translateService;
        this.translations = new Map<string, string>();
        if (keys.length)
            this.translateService.get(keys).subscribe((translations) => keys.forEach((key) => this.translations.set(key, translations[key])));
    }

    get(key: string): string {
        return this.translations.get(key) ?? '';
    }
}
