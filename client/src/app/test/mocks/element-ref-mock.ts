import { Injectable } from '@angular/core';

@Injectable()
export class MockElementRef {
    nativeElement = {
        contains: jasmine.createSpy('contains'),
        children: [{ contains: jasmine.createSpy('contains') }],
    };
}
