/* eslint-disable dot-notation -- Méthode privée */
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { DEFAULT_VIRTUAL_PLAYER_BEGINNER } from '@app/constants/default-virtual-player-name';
import { DatabaseService } from '@app/services/database/database.service';
import { VirtualPlayerNameService } from '@app/services/virtual-player-name/virtual-player-name.service';
import { DatabaseStub } from '@app/test/classes-stubs/database-stub';
import { doNothing } from '@app/test/do-nothing-function';
import { Difficulty } from '@common/enums/difficulty';
import { CommonVirtualPlayerName } from '@common/game-view-related/common-virtual-player-name';
import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import { createStubInstance, restore, stub } from 'sinon';
import { Container, Token } from 'typedi';

describe('VirtualPlayerNameService', () => {
    let virtualPlayerNameService: VirtualPlayerNameService;
    const testPlayerName: CommonVirtualPlayerName = {
        playerName: 'John Doe',
    };

    before(() => chai.use(chaiAsPromised));

    beforeEach(async () => {
        restore();
        stub(MathUtils, 'shuffleArray');
        const getStub = stub(Container, 'get');
        const databaseService = createStubInstance(DatabaseService);
        const database = new DatabaseStub<CommonVirtualPlayerName>();

        stub(databaseService, 'database').get(() => database);
        getStub.withArgs(DatabaseService as Token<unknown>).returns(databaseService);

        virtualPlayerNameService = new VirtualPlayerNameService();
        virtualPlayerNameService.collection.insertOne(testPlayerName);
    });

    afterEach(() => restore());

    it('should get all names from DB JV beginner', async () => {
        const expectedLength = 1;
        const names = await virtualPlayerNameService.getAllNames(Difficulty.Easy);

        expect(names.length).to.equal(expectedLength);
        expect(testPlayerName).to.deep.equals(names[0]);
    });

    it('should get all names from DB JV expert', async () => {
        const expectedLength = 1;
        const names = await virtualPlayerNameService.getAllNames(Difficulty.Hard);

        expect(names.length).to.equal(expectedLength);
        expect(testPlayerName).to.deep.equals(names[0]);
    });

    it('should get first name if not equal to first player name', async () => {
        const secondTestPlayerName: CommonVirtualPlayerName = {
            playerName: 'Ron',
        };

        const namePlayerOne = 'PlayerOne';

        await virtualPlayerNameService.collection.insertOne(secondTestPlayerName);

        const name = await virtualPlayerNameService.getName(Difficulty.Hard, namePlayerOne);

        expect(name).to.deep.equals(testPlayerName);
    });

    it('should get second name if first name equal to first player name', async () => {
        const secondTestPlayerName: CommonVirtualPlayerName = {
            playerName: 'Ron',
        };

        await virtualPlayerNameService.collection.insertOne(secondTestPlayerName);
        const name = await virtualPlayerNameService.getName(Difficulty.Hard, testPlayerName.playerName);

        expect(name).to.deep.equals(secondTestPlayerName);
    });

    it('should throw an error if we try to get all names on a closed connection', async () => {
        stub(virtualPlayerNameService['databaseService'], 'database').get(doNothing());
        expect(virtualPlayerNameService.getAllNames(Difficulty.Hard)).to.eventually.be.rejectedWith();
    });

    it('should throw an error if we try to get a name on a closed connection', async () => {
        stub(virtualPlayerNameService['databaseService'], 'database').get(doNothing());
        expect(virtualPlayerNameService.getName(Difficulty.Hard, testPlayerName.playerName)).to.eventually.be.rejectedWith();
    });

    it('virtual name player should be change to first default if getName throw an error and playerOne name is not the same', async () => {
        stub(virtualPlayerNameService, 'getName').throws();

        const name = await virtualPlayerNameService.changeName(Difficulty.Easy, DEFAULT_VIRTUAL_PLAYER_BEGINNER[1].playerName);

        expect(name).to.eql(DEFAULT_VIRTUAL_PLAYER_BEGINNER[0].playerName);
    });

    it('virtual name player should be change to second default if getName throw an error and playerOne name is the same', async () => {
        stub(virtualPlayerNameService, 'getName').throws();

        const name = await virtualPlayerNameService.changeName(Difficulty.Easy, DEFAULT_VIRTUAL_PLAYER_BEGINNER[0].playerName);

        expect(name).to.eql(DEFAULT_VIRTUAL_PLAYER_BEGINNER[1].playerName);
    });
});
