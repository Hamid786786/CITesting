// Isolated unit tests for the sorter service

import {SorterService} from './sorter.service';
import {MOCK_COLLECTION} from '@pl/testing/mock-data';

let sorter = new SorterService();
let sorted: any[];
let prop: string;

describe('Service: SorterService', () => {

  beforeEach(() => {
    sorted = MOCK_COLLECTION;
  });

  describe('sort() unit tests', () => {
    it('should sort an empty collection with no changes', () => {
      prop = 'health';
      sorted = [];
      sorter.sort(sorted, prop);

      expect(sorted.length).toEqual(0, 'no objects');
      expect(sorter.isReversed()).toBe(false, 'sorted ascending');
    });

    it('should correctly sort a populated collection', () => {
      prop = 'name';
      sorter.sort(sorted, prop);

      expect(sorted.length).toEqual(MOCK_COLLECTION.length, 'same length');
      expect(sorter.isReversed()).toBe(false, 'sorted ascending');
      expect(sorted[0].name).toEqual('Dr. Boom');
      expect(sorted[1].name).toEqual('Emperor Thaurissan');
      expect(sorted[2].name).toEqual('Justicar Trueheart');
      expect(sorted[3].name).toEqual('Kel\'Thuzad');
      expect(sorted[4].name).toEqual('Leeroy Jenkins');
      expect(sorted[5].name).toEqual('Reno Jackson');
      expect(sorted[6].name).toEqual('Sir Finley Mrrgglton');
      expect(sorted[7].name).toEqual('Yogg-Saron, Hope\'s End');
    });

    it('should sort in reverse order if called with the same property parameter', () => {
      prop = 'name';
      sorter.sort(sorted, prop);

      expect(sorted.length).toEqual(MOCK_COLLECTION.length, 'same length');
      expect(sorter.isReversed()).toBe(true, 'sorted descending');
      expect(sorted[7].name).toEqual('Dr. Boom');
      expect(sorted[6].name).toEqual('Emperor Thaurissan');
      expect(sorted[5].name).toEqual('Justicar Trueheart');
      expect(sorted[4].name).toEqual('Kel\'Thuzad');
      expect(sorted[3].name).toEqual('Leeroy Jenkins');
      expect(sorted[2].name).toEqual('Reno Jackson');
      expect(sorted[1].name).toEqual('Sir Finley Mrrgglton');
      expect(sorted[0].name).toEqual('Yogg-Saron, Hope\'s End');
    });

  });

});
