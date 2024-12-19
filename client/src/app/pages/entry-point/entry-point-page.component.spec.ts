import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LetterComponent } from '@app/components/letter/letter.component';
import { EntryPointPageComponent } from '@app/pages/entry-point/entry-point-page.component';
import { NewGameConfigurationService } from '@app/services/new-game-configuration/new-game-configuration.service';

import SpyObj = jasmine.SpyObj;

describe('EntryPointPageComponent', () => {
    let component: EntryPointPageComponent;
    let fixture: ComponentFixture<EntryPointPageComponent>;
    let newGameConfigurationServiceSpy: SpyObj<NewGameConfigurationService>;

    beforeEach(() => (newGameConfigurationServiceSpy = jasmine.createSpyObj('NewGameConfigurationService', ['setGameMode'])));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [EntryPointPageComponent, LetterComponent],
            providers: [{ provide: NewGameConfigurationService, useValue: newGameConfigurationServiceSpy }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryPointPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
