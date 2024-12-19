import { Filter, InferIdType, InsertOneResult, ObjectId, UpdateFilter, UpdateResult } from 'mongodb';

export class CollectionStub<T> {
    save: T[];

    constructor() {
        this.save = [];
    }

    // eslint-disable-next-line no-unused-vars -- Pour mocker MongoDB
    find(queryFilter: Filter<T>): CollectionStub<T> {
        return this;
    }

    // eslint-disable-next-line no-unused-vars -- Pour mocker MongoDB
    findOne(queryFilter: Filter<T>): CollectionStub<T> {
        return this;
    }

    // eslint-disable-next-line no-unused-vars -- Pour mocker MongoDB
    sort(sortFilter: Filter<T>): CollectionStub<T> {
        return this;
    }

    toArray(): CollectionStub<T> {
        return this;
    }

    // eslint-disable-next-line no-unused-vars -- Pour mocker MongoDB
    deleteOne(queryFilter: Filter<T>): CollectionStub<T> {
        return this;
    }

    // eslint-disable-next-line no-unused-vars -- Pour mocker MongoDB
    async updateOne(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>): Promise<UpdateResult> {
        const updateResult: UpdateResult = {
            acknowledged: false,
            matchedCount: 1,
            modifiedCount: 1,
            upsertedCount: 1,
            upsertedId: new ObjectId('6348acd2e1a47ca32e79f46f'),
        };

        return updateResult;
    }

    // eslint-disable-next-line no-unused-vars
    limit(limit: number): CollectionStub<T> {
        return this;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any -- Pour mocker les paramètres
    then(any: any): T[] {
        any();
        return this.save;
    }

    async insertOne(object: T): Promise<InsertOneResult<T>> {
        this.save.push(object);
        const idValue: number = this.save.length;

        const insertOneResult: InsertOneResult<T> = {
            acknowledged: false,
            insertedId: idValue as unknown as InferIdType<T>,
        };

        return insertOneResult;
    }

    async replaceOne(objects: T): Promise<void> {
        this.save = [objects];
    }
}
