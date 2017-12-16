import { BaseEntity } from './../../shared';

export class BookingMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public startDate?: any,
        public endDate?: any,
        public numberOfPeople?: number,
        public advancePaid?: number,
        public bookedRooms?: BaseEntity[],
        public customersId?: number,
    ) {
    }
}
