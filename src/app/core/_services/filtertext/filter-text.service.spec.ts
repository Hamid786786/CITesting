// Isolated unit tests for the filter-text service

import {FilterTextService} from './filter-text.service';

let service = new FilterTextService();
let query: string;
let props: string[];
let sourceList: any[] = [
  {
    name: 'Dr. Boom',
    attack: '7',
    health: '7',
    set: 'Goblins vs. Gnomes'
  },
  {
    name: 'Reno Jackson',
    attack: '4',
    health: '6',
    set: 'League of Explorers'
  },
  {
    name: 'Sir Finley Mrrgglton',
    attack: '1',
    health: '3',
    set: 'League of Explorers'
  },
  {
    name: 'Leeroy Jenkins',
    attack: '6',
    health: '2',
    set: 'Classic'
  }
];

describe('Service: FilterTextService', () => {

  describe('filter() unit tests', () => {

    it('should return the exact source array', () => {
      query = '';
      props = [''];
      let filtered = service.filter(query, props, sourceList);

      expect(filtered)
        .toEqual(sourceList, 'filtered list matches source list');
    });

    it('should return an array with one object', () => {
      query = 'Jackson';
      props = ['name'];
      let filtered = service.filter(query, props, sourceList);

      expect(filtered.length).toEqual(1, 'filtered list has one object');
      expect(filtered[0].name)
        .toEqual('Reno Jackson', 'filter property matches');
    });

    it('should return multiple objects', () => {
      query = '6';
      props = ['attack', 'health'];
      let filtered = service.filter(query, props, sourceList);
      let leeroyObj = {
        name: 'Leeroy Jenkins',
        attack: '6',
        health: '2',
        set: 'Classic'
      };

      expect(filtered.length).toEqual(2, 'filtered list has two objects');
      expect(filtered).toContain(leeroyObj, 'filtered object matches entirely');
    });

    it('should return no objects', () => {
      query = 'Diablo II';
      props = ['set'];
      let filtered = service.filter(query, props, sourceList);

      expect(filtered.length).toEqual(0, 'filtered list has no objects');
    });

    it('should ignore case in query string', () => {
      query = 'bOOm';
      props = ['name'];
      let filtered = service.filter(query, props, sourceList);
      expect(filtered.length).toEqual(1, 'filtered list has one object');
      expect(filtered[0].name).toEqual('Dr. Boom', 'name matches');
    });
  });

});
