/* eslint-disable id-length -- necessaire pour la constuction des lettres par caractere*/
import { Letter } from '@app/classes/letters/letter/letter';
import { FOUR_POINTS, HEIGHT_POINTS, ONE_POINT, TEN_POINTS, THREE_POINTS, TWO_POINTS, ZERO_POINT } from '@app/constants/default/default-letter';

export const emptyLetter = (): Letter => {
    return new Letter('', 0);
};

export class LettersFactory {
    static get a(): Letter {
        return new Letter('a', ONE_POINT);
    }

    static get b(): Letter {
        return new Letter('b', THREE_POINTS);
    }

    static get c(): Letter {
        return new Letter('c', THREE_POINTS);
    }

    static get d(): Letter {
        return new Letter('d', TWO_POINTS);
    }

    static get e(): Letter {
        return new Letter('e', ONE_POINT);
    }

    static get f(): Letter {
        return new Letter('f', FOUR_POINTS);
    }

    static get g(): Letter {
        return new Letter('g', TWO_POINTS);
    }

    static get h(): Letter {
        return new Letter('h', FOUR_POINTS);
    }

    static get i(): Letter {
        return new Letter('i', ONE_POINT);
    }

    static get j(): Letter {
        return new Letter('j', HEIGHT_POINTS);
    }

    static get k(): Letter {
        return new Letter('k', TEN_POINTS);
    }

    static get l(): Letter {
        return new Letter('l', ONE_POINT);
    }

    static get m(): Letter {
        return new Letter('m', TWO_POINTS);
    }

    static get n(): Letter {
        return new Letter('n', ONE_POINT);
    }

    static get o(): Letter {
        return new Letter('o', ONE_POINT);
    }

    static get p(): Letter {
        return new Letter('p', THREE_POINTS);
    }

    static get q(): Letter {
        return new Letter('q', HEIGHT_POINTS);
    }

    static get r(): Letter {
        return new Letter('r', ONE_POINT);
    }

    static get s(): Letter {
        return new Letter('s', ONE_POINT);
    }

    static get t(): Letter {
        return new Letter('t', ONE_POINT);
    }

    static get u(): Letter {
        return new Letter('u', ONE_POINT);
    }

    static get v(): Letter {
        return new Letter('v', FOUR_POINTS);
    }

    static get w(): Letter {
        return new Letter('w', TEN_POINTS);
    }

    static get x(): Letter {
        return new Letter('x', TEN_POINTS);
    }

    static get y(): Letter {
        return new Letter('y', TEN_POINTS);
    }

    static get z(): Letter {
        return new Letter('z', TEN_POINTS);
    }

    static get blank(): Letter {
        return new Letter('*', ZERO_POINT);
    }
}
