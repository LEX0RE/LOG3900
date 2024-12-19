import { compareVector2D, coordinateToVector2D, vector2DToCoordinate } from '@app/classes/utils/vector-2d/vector-2d';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { Coordinate } from '@common/interfaces/coordinate';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('Vector-coordinate-conversion', () => {
    it('should a coordinate O1 be 0,0', () => {
        const coordinate: Coordinate = { column: 1, row: 'O' };
        const vector: Vector2D = { x: 0, y: 14 };

        expect(coordinateToVector2D(coordinate)).to.be.eql(vector);
        expect(vector2DToCoordinate(vector)).to.be.eql(coordinate);
    });

    it('should a coordinate O15 be 14,0', () => {
        const coordinate: Coordinate = { column: 15, row: 'O' };
        const vector: Vector2D = { x: 14, y: 14 };

        expect(coordinateToVector2D(coordinate)).to.be.eql(vector);
        expect(vector2DToCoordinate(vector)).to.be.eql(coordinate);
    });

    it('should a coordinate A1 be 0,14', () => {
        const coordinate: Coordinate = { column: 1, row: 'A' };
        const vector: Vector2D = { x: 0, y: 0 };

        expect(coordinateToVector2D(coordinate)).to.be.eql(vector);
        expect(vector2DToCoordinate(vector)).to.be.eql(coordinate);
    });

    it('should a coordinate A15 be 14,14', () => {
        const coordinate: Coordinate = { column: 15, row: 'A' };
        const vector: Vector2D = { x: 14, y: 0 };

        expect(coordinateToVector2D(coordinate)).to.be.eql(vector);
        expect(vector2DToCoordinate(vector)).to.be.eql(coordinate);
    });

    it('should a coordinate H8 be 7,7', () => {
        const coordinate: Coordinate = { column: 8, row: 'H' };
        const vector: Vector2D = { x: 7, y: 7 };

        expect(coordinateToVector2D(coordinate)).to.be.eql(vector);
        expect(vector2DToCoordinate(vector)).to.be.eql(coordinate);
    });

    it('should throw when invalid coordinate', () => {
        const coordinate: Coordinate = { column: 8, row: 'Z' };

        expect(() => coordinateToVector2D(coordinate)).to.throw();
    });

    it('compareVector2D should return true if vector are the same', () => {
        const vector: Vector2D = { x: 1, y: 1 };

        expect(compareVector2D(vector, vector)).to.be.eql(true);
    });

    it('compareVector2D should return false if vector are diffrent', () => {
        const vector1: Vector2D = { x: 1, y: 1 };
        const vector2: Vector2D = { x: -1, y: -1 };

        expect(compareVector2D(vector1, vector2)).to.be.eql(false);
    });
});
