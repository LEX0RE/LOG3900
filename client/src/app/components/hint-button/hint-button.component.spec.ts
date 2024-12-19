import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HintButtonComponent } from '@app/components/hint-button/hint-button.component';

describe('HintButtonComponent', () => {
    let component: HintButtonComponent;
    let fixture: ComponentFixture<HintButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            declarations: [HintButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HintButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('sendHint should call sendHelp', () => {
        // eslint-disable-next-line dot-notation -- Membre privé
        const spyConversion = spyOn(component['conversionService'], 'sendHint');

        component.sendHint();
        expect(spyConversion).toHaveBeenCalled();
    });
});
