import { Dictionary } from '@app/classes/dictionary/dictionary';
import { FAKE_NODES, FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect } from 'chai';
import { restore } from 'sinon';

describe('Dictionary', () => {
    const fakeTitle = 'Title';
    const fakeDesc = 'Desc';
    const fakeId = 0;
    let dictionary: Dictionary;
    let words: string[];

    beforeEach(() => {
        words = FAKE_WORDS();
        dictionary = new Dictionary({ title: fakeTitle, description: fakeDesc, dictionaryId: fakeId }, FAKE_NODES());
    });

    afterEach(() => restore());

    it('should create a dictionary with title and description', () => {
        expect(dictionary.title).to.be.eql(fakeTitle);
        expect(dictionary.description).to.be.eql(fakeDesc);
    });

    it('should return true if words is in dictionary', () => {
        expect(dictionary.isContaining(words[0])).to.be.eql(true);
        expect(dictionary.isContaining(words[1])).to.be.eql(true);
    });

    it('should return false if words is not in dictionary', () => {
        expect(dictionary.isContaining('')).to.be.eql(false);
        expect(dictionary.isContaining('randomStuff')).to.be.eql(false);
    });
});
