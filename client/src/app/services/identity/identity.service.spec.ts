import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { IdentityService } from '@app/services/identity/identity.service';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';

describe('Service: Identity', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE(), HttpClientTestingModule],

            providers: [IdentityService],
        });
    });

    it('should ...', inject([IdentityService], (service: IdentityService) => {
        expect(service).toBeTruthy();
    }));
});
