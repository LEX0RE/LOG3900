import { CollectionStub } from '@app/test/classes-stubs/collection-stub';

export class DatabaseStub<T> {
    save!: CollectionStub<T>;

    // eslint-disable-next-line no-unused-vars -- Pour mocker MongoDB
    collection(name: string): CollectionStub<T> {
        if (!this.save) this.save = new CollectionStub<T>();
        return this.save;
    }
}
