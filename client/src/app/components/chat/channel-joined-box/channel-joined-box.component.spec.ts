import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChannelJoinedBoxComponent } from '@app/components/chat/channel-joined-box/channel-joined-box.component';

describe('channelJoinedBoxComponent', () => {
    let component: ChannelJoinedBoxComponent;
    let fixture: ComponentFixture<ChannelJoinedBoxComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            declarations: [ChannelJoinedBoxComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelJoinedBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should call goToSearchChannel from chatBoxInteractionService  ', () => {
        const spyConversion = spyOn(component.chatBoxInteractionService, 'goToSearchChat');

        component.goToSearchChat();
        expect(spyConversion).toHaveBeenCalled();
    });

    it('should change needNewChannel to true when createChannel is called ', () => {
        component.needNewChannel = true;

        component.createChannel();
        expect(component.needNewChannel).toBeTruthy();
    });

    it('should change needNewChannel to false when cancelNewChannel is called ', () => {
        component.needNewChannel = false;

        component.cancelNewChat();
        expect(component.needNewChannel).toBeFalsy();
    });
});
