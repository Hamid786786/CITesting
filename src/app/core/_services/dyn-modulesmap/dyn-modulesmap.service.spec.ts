import { TestBed, inject } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DynModulesmapService } from './dyn-modulesmap.service';
import {ExceptionService} from '../utils/exception.service';
import {Observable} from 'rxjs/Observable';

describe('DynModulesmapService', () => {
  let equipmentsMap = [
    {
      moduleNumber: '76',
      moduleDescription: 'Equipment-1',
      imageURL: '/assets/img/carousel1.jpg',
      latitude: '51.673858',
      longitude: '7.815982 ',
      id: 1
    },
    {
      moduleNumber: '88',
      moduleDescription: 'Equipment-2',
      imageURL: '/assets/img/carousel2.jpg',
      latitude: '51.373858',
      longitude: '7.215982 ',
      id: 2
    },
    {
      moduleNumber: '99',
      moduleDescription: 'Equipment-3',
      imageURL: '/assets/img/carousel3.jpg',
      latitude: '51.723858',
      longitude: '7.895982',
      id: 3
    },
    {
      moduleNumber: '11',
      moduleDescription: 'Equipment-4',
      imageURL: '/assets/img/carousel4.jpg',
      latitude: '51.203858',
      longitude: '7.795982 ',
      id: 4
    },
    {
      moduleNumber: '10',
      moduleDescription: 'Equipment-1',
      imageURL: '/assets/img/carousel1.jpg',
      latitude: '51.053858',
      longitude: '7.815982 ',
      id: 5
    },
    {
      moduleNumber: '20',
      moduleDescription: 'Equipment-2',
      imageURL: '/assets/img/carousel2.jpg',
      latitude: '51.203858',
      longitude: '7.215982 ',
      id: 6
    },
    {
      moduleNumber: '30',
      moduleDescription: 'Equipment-3',
      imageURL: '/assets/img/carousel3.jpg',
      latitude: '51.303858',
      longitude: '7.895982',
      id: 7
    },
    {
      moduleNumber: '40',
      moduleDescription: 'Equipment-4',
      imageURL: '/assets/img/carousel4.jpg',
      latitude: '51.403858',
      longitude: '7.795982 ',
      id: 8
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers: [DynModulesmapService, ExceptionService]
    });
  });

  it('ModulesMapService should be created', inject([DynModulesmapService], (service: DynModulesmapService) => {
    expect(service).toBeTruthy();
  }));
  it('Should Call getEquipmentMaps to return Observable of maps data',
    inject([
        DynModulesmapService
      ],
      (service: DynModulesmapService) => {
        let moduleID = 1;
        let page = 1;
        spyOn(service, 'getEquipmentMaps')
          .and.returnValue(Observable.of(equipmentsMap));
        let mapsObs = service.getEquipmentMaps(moduleID, page);
        mapsObs.subscribe( (equipMaps) => {
          expect(equipMaps.length).toEqual(equipmentsMap.length);
          expect(equipMaps[0]).toEqual(equipmentsMap[0]);
        });
      })
  );
});
