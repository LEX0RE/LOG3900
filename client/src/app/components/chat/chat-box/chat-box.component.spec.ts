// Fichier inspiré des notes de cours
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatBoxComponent } from '@app/components/chat/chat-box/chat-box.component';
import { InputBoxComponent } from '@app/components/chat/input-box/input-box.component';
import { OutputBoxComponent } from '@app/components/chat/output-box/output-box.component';

describe('ChatBoxComponent', () => {
    let component: ChatBoxComponent;
    let fixture: ComponentFixture<ChatBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), FormsModule],
            declarations: [ChatBoxComponent, InputBoxComponent, OutputBoxComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
