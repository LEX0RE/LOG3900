import { ViewLetter } from '@app/classes/view-letter';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { PlacementStep } from '@app/enum/placements';
import { FAKE_VIEW_LETTERS_GRID } from '@app/test/constants/fake-view-letters';
import { mockCommandConversionService } from '@app/test/mocks/conversion-service-mock';
import { Orientation } from '@common/enums/orientation';

export const gridContextStub = () =>
    jasmine.createSpyObj('GridContextService', ['comparePosition', 'samePosition'], {
        letterA: new ViewLetter({ letter: 'a', point: 2 }, EaselSelectionType.Unselected),
        letterBlank: new ViewLetter({ letter: '*', point: 0 }, EaselSelectionType.Unselected),
        conversionService: mockCommandConversionService(),
        placement: {
            step: PlacementStep.NoClick,
            initialPlacement: { x: 1, y: 1 },
            orientation: Orientation.None,
            letters: FAKE_VIEW_LETTERS_GRID(),
        },
        initialPlacementAsCoordinate: { row: 'A', column: 1 },
    });
