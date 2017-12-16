/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { CustomerMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix-dialog.component';
import { CustomerMySuffixService } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.service';
import { CustomerMySuffix } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerMySuffix Management Dialog Component', () => {
        let comp: CustomerMySuffixDialogComponent;
        let fixture: ComponentFixture<CustomerMySuffixDialogComponent>;
        let service: CustomerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [CustomerMySuffixDialogComponent],
                providers: [
                    CustomerMySuffixService
                ]
            })
            .overrideTemplate(CustomerMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.customer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.customer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
