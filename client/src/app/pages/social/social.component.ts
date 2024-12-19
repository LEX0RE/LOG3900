import { Component, Input, OnInit } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { SocialManagerService } from '@app/services/social-manager/social-manager.service';
import { UserProfile } from '@common/interfaces/user-profile';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-social',
    templateUrl: './social.component.html',
    styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
    @Input() switchRelation: boolean;
    hover: boolean;
    search: boolean;
    socialManagerService: SocialManagerService;
    player: string;
    translationsContainer: TranslateContainer;

    constructor(socialManagerService: SocialManagerService, translate: TranslateService) {
        this.switchRelation = true;
        this.search = false;
        this.socialManagerService = socialManagerService;
        this.hover = false;
        this.translationsContainer = new TranslateContainer(translate, [
            'socialTitle',
            'blockedPlayers',
            'relationships',
            'FriendRequests',
            'FindAPlayer',
            'return',
        ]);
    }

    ngOnInit(): void {
        this.socialManagerService.needSocial();
        this.player = '';
    }

    get friends(): UserProfile[] {
        return this.socialManagerService.friends;
    }

    get newFriends(): UserProfile[] {
        return this.socialManagerService.newFriends;
    }

    get isSearching() {
        return this.search;
    }

    get userBlock(): UserProfile[] {
        return this.socialManagerService.userBlock;
    }

    get allUser(): UserProfile[] {
        return this.socialManagerService.allUser;
    }

    switch(relation: boolean) {
        this.switchRelation = relation;
    }

    acceptFriend(friendId: string) {
        this.socialManagerService.acceptFriend(friendId);
    }

    refuseFriend(friendId: string) {
        this.socialManagerService.refuseFriend(friendId);
    }

    removeFriend(friendId: string) {
        this.socialManagerService.removeFriend(friendId);
    }

    addUserToBlock(userId: string) {
        this.socialManagerService.addUserToBlock(userId);
    }

    removeFromBlock(userId: string) {
        this.socialManagerService.removeFromBlock(userId);
    }

    sendRequest(userId: string) {
        this.socialManagerService.sendRequest(userId);
    }

    openSearch() {
        this.search = true;
    }

    closeSearch() {
        if (!this.hover) this.search = false;
    }

    onUserListHover(hover: boolean) {
        this.hover = hover;
    }

    // eslint-disable-next-line no-unused-vars
    searchUser(event: Event) {
        this.socialManagerService.player = this.player;
    }
}
