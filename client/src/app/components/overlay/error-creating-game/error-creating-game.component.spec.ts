import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorCreatingGameComponent } from '@app/components/overlay/error-creating-game/error-creating-game.component';

describe('ErrorCreatingGameComponent', () => {
    let component: ErrorCreatingGameComponent;
    let fixture: ComponentFixture<ErrorCreatingGameComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ErrorCreatingGameComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(ErrorCreatingGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorCreatingGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close the overlay by setting the value to false', () => {
        // eslint-disable-next-line dot-notation -- Propriété privée
        component['newGameConfigurationService'].openErrorCreatingGameOverlay = true;

        component.close();

        // eslint-disable-next-line dot-notation -- Propriété privée
        expect(component['newGameConfigurationService'].openErrorCreatingGameOverlay).toBeFalse();
    });
});
