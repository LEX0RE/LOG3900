import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChannelJoinedBoxComponent } from '@app/components/chat/channel-joined-box/channel-joined-box.component';
import { SearchChannelBoxComponent } from '@app/components/chat/search-channel-box/search-channel-box.component';

describe('SearchchannelBoxComponent', () => {
    let component: SearchChannelBoxComponent;
    let fixture: ComponentFixture<SearchChannelBoxComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            declarations: [ChannelJoinedBoxComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchChannelBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
