import { Component, Input } from '@angular/core';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { CommonBracket } from '@common/interfaces/tournament/common-bracket';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-bracket-tree',
    templateUrl: './bracket-tree.component.html',
    styleUrls: ['./bracket-tree.component.scss'],
})
export class BracketTreeComponent {
    @Input() brackets: CommonBracket[];
    translationsContainer: TranslateContainer;

    constructor(translate: TranslateService) {
        this.translationsContainer = new TranslateContainer(translate, ['thirdPlaceMatch']);
    }

    leftSide(): CommonBracket {
        return this.brackets[0].children[0];
    }

    rightSide(): CommonBracket {
        return { ...this.brackets[0], children: [this.brackets[0].children[1]] };
    }
}
