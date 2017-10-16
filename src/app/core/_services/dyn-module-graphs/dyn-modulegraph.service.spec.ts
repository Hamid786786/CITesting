import { TestBed, inject } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DynModulesGraphService } from './dyn-modulegraph.service';
import {ExceptionService} from '../utils/exception.service';
import {Observable} from 'rxjs/Observable';

describe('DynModulesGraphService', () => {
  let equipmentGraph = [
    {
      id: 1,
      type: 'graph',
      title: 'Equipment-1',
      w: 1,
      h: 1,
      x: 0,
      y: 0,
      content: {
        url: '/assets/img/graph1.png'
      }
    },
    {
      id: 2,
      type: 'graph',
      title: 'Equipment-2',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph2.png'
      }
    },
    {
      id: 3,
      type: 'graph',
      title: 'Equipment-3',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph3.png'
      }
    },
    {
      id: 4,
      type: 'graph',
      title: 'Equipment-4',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph4.png'
      }
    },
    {
      id: 5,
      type: 'graph',
      title: 'Equipment-5',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph5.png'
      }
    },
    {
      id: 6,
      type: 'graph',
      title: 'Equipment-6',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph6.png'
      }
    },
    {
      id: 7,
      type: 'graph',
      title: 'Equipment-7',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph1.png'
      }
    },
    {
      id: 8,
      type: 'graph',
      title: 'Equipment-8',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      content: {
        url: '/assets/img/graph2.png'
      }
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers: [DynModulesGraphService, ExceptionService]
    });
  });

  it('GraphService should be created', inject([DynModulesGraphService], (service: DynModulesGraphService) => {
    expect(service).toBeTruthy();
  }));

  it('Should Call getEquipmentGraphs to return Observable of graphs data',
    inject([
        DynModulesGraphService
      ],
      (service: DynModulesGraphService) => {
        let moduleID = 1;
        let page = 1;
        spyOn(service, 'getEquipmentGraphs')
          .and.returnValue(Observable.of(equipmentGraph));
        let graphsObs = service.getEquipmentGraphs(moduleID, page);
        graphsObs.subscribe( (equipGraphs) => {
          expect(equipGraphs.length).toEqual(equipmentGraph.length);
          expect(equipGraphs[0]).toEqual(equipmentGraph[0]);
        });
      })
  );
});
