// Fichier inspiré des notes de cours
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatBoxComponent } from '@app/components/chat/chat-box/chat-box.component';
import { HeaderBoxComponent } from '@app/components/chat/header-box/header-box.component';
import { InputBoxComponent } from '@app/components/chat/input-box/input-box.component';
import { OutputBoxComponent } from '@app/components/chat/output-box/output-box.component';

describe('HeaderBoxComponent', () => {
    let component: HeaderBoxComponent;
    let fixture: ComponentFixture<HeaderBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), FormsModule],
            declarations: [ChatBoxComponent, InputBoxComponent, OutputBoxComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call closeChat from chatBoxInteractionService  when it called closeChat ', () => {
        const spyConversion = spyOn(component.chatBoxInteractionService, 'closeChat');

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions
        component.closeChat();

        expect(spyConversion).toHaveBeenCalled();
    });

    it('should call goToChannelJoined from chatBoxInteractionService  when it called goToChatJoined ', () => {
        const spyConversion = spyOn(component.chatBoxInteractionService, 'goToChatJoined');

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions
        component.goToChannelJoined();

        expect(spyConversion).toHaveBeenCalled();
    });
});
