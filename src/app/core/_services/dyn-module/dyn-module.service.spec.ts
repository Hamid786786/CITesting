import {TestBed, inject} from '@angular/core/testing';

import {DynModuleService} from './dyn-module.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ExceptionService} from '../utils/exception.service';
import {Observable} from 'rxjs/Observable';

describe('DynModuleService', () => {
  let equipmentList = [
    {
      id: 1,
      equipmentNumber: '1111',
      description: 'Description of equipment-1',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 10,
      country: 'America',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 2,
      equipmentNumber: '2222',
      description: 'Description of equipment-2',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 11,
      country: 'America',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 3,
      equipmentNumber: '3333',
      description: 'Description of equipment-3',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 21,
      country: 'America',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 4,
      equipmentNumber: '4444',
      description: 'Description of equipment-4',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 21,
      country: 'Australia',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 5,
      equipmentNumber: '5555',
      description: 'Description of equipment-5',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 6,
      country: 'Australia',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 6,
      equipmentNumber: '6666',
      description: 'Description of equipment-6',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 6,
      country: 'India',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 7,
      equipmentNumber: '7777',
      description: 'Description of equipment-7',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 12,
      country: 'England',
      intakeDate: 1501662610000,
      column: 'CCC'
    },
    {
      id: 8,
      equipmentNumber: '8888',
      description: 'Description of equipment-8',
      maintainancePlant: 'Indoor plant',
      status: 'zzz',
      amount: 6,
      country: 'India',
      intakeDate: 1501662610000,
      column: 'CCC'
    }
  ];
  let equipmentMetadata = [
    {
      id: 1,
      fieldId: 'equipmentNumber',
      headerLabel: 'Equipment Number',
      dataType: 'CHAR',
      order: 1,
      alignment: 'center',
      sort_order: 'asc',
      width: '20%',
      flag: 1
    },
    {
      id: 2,
      fieldId: 'description',
      headerLabel: 'Description',
      dataType: 'CHAR',
      order: 2,
      alignment: 'center',
      sort_order: 'asc',
      width: '21%',
      flag: 1
    },
    {
      id: 3,
      fieldId: 'maintainancePlant',
      headerLabel: 'Maintainance Plant',
      dataType: 'CHAR',
      order: 4,
      alignment: 'center',
      sort_order: 'asc',
      width: '20%',
      flag: 1
    },
    {
      id: 4,
      fieldId: 'status',
      headerLabel: 'Status',
      dataType: 'CHAR',
      order: 5,
      alignment: 'center',
      sort_order: 'asc',
      width: '20%',
      flag: 0
    },
    {
      id: 5,
      fieldId: 'amount',
      headerLabel: 'Amount',
      dataType: 'NUMBER',
      order: 7,
      alignment: 'center',
      sort_order: 'asc',
      width: '15%',
      flag: 1
    },
    {
      id: 6,
      fieldId: 'country',
      headerLabel: 'Country',
      dataType: 'CHAR',
      order: 6,
      alignment: 'center',
      sort_order: 'asc',
      width: '16%',
      flag: 1
    },
    {
      id: 7,
      fieldId: 'intakeDate',
      headerLabel: 'Intake Date',
      dataType: 'DATE',
      order: 3,
      alignment: 'center',
      sort_order: 'asc',
      width: '16%',
      flag: 1
    },
    {
      id: 8,
      fieldId: 'column',
      headerLabel: 'Column',
      dataType: 'IMAGE',
      order: 8,
      alignment: 'center',
      sort_order: 'asc',
      width: '20%',
      flag: 0
    }
  ];
  let equipmentFilters = [
    {
      module: 'equipment',
      moduleId: 1,
      result: [
        {
          type: 'standard',
          title: 'Standard Filters',
          filters: [
            {
              description: 'Last 10 days',
              key: '_limit',
              value: 2
            },
            {
              description: 'Last 20 days',
              key: '_limit',
              value: 4
            },
            {
              description: 'Last 30 days',
              key: '_limit',
              value: 6
            }
          ]
        },
        {
          type: 'suggestion',
          title: 'Suggestion',
          filters: [
            {
              description: 'Amount',
              key: 'amount',
              value: 6
            },
            {
              description: 'Amount',
              key: 'amount',
              value: 21
            },
            {
              description: 'Country',
              key: 'country',
              value: 'America'
            },
            {
              description: 'Country',
              key: 'country',
              value: 'Australia'
            }
          ]
        },
        {
          type: 'number',
          title: 'Numeric Filters',
          filters: [
            {
              description: 'Amount',
              key: 'amount',
              value: 0
            }
          ]
        },
        {
          type: 'date',
          title: 'Date Filters',
          filters: [
            {
              description: 'Payment Date',
              key: 'field2',
              startDate: '',
              endDate: ''
            }
          ]
        }
      ]
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DynModuleService, HttpClient, ExceptionService]
    });
  });

  it('ModuleService should be created', inject([DynModuleService], (service: DynModuleService) => {
    expect(service).toBeTruthy();
  }));
  it('Should Call getEquipmentList to return Observable of List Data',
    inject([
        DynModuleService
      ],
      (service: DynModuleService) => {
        let moduleID = 1;
        let filterParams = '';
        let sort = '';
        let recordId = 1;
        spyOn(service, 'getEquipmentList')
          .and.returnValue(Observable.of(equipmentList));
        let listObs = service.getEquipmentList(moduleID, recordId, filterParams, sort);
        listObs.subscribe((equipLists) => {
          expect(equipLists.length).toEqual(equipmentList.length);
          expect(equipLists[0]).toEqual(equipmentList[0]);
        });
      })
  );
  it('Should Call getEquipmentMeta to return Observable of Header List Data',
    inject([
        DynModuleService
      ],
      (service: DynModuleService) => {
        let moduleID = 1;
        spyOn(service, 'getEquipmentMeta')
          .and.returnValue(Observable.of(equipmentMetadata));
        let listObs = service.getEquipmentMeta(moduleID);
        listObs.subscribe((equipMetaLists) => {
          expect(equipMetaLists.length).toEqual(equipmentMetadata.length);
          expect(equipMetaLists[0]).toEqual(equipmentMetadata[0]);
        });
      })
  );
  it('Should Call getEquipmentMeta to update Header List Data',
    inject([
        DynModuleService
      ],
      (service: DynModuleService) => {
        let moduleId = 1;
        let id = 0;
        let metaObj =  {
            id: 1,
            fieldId: 'equipmentNumber',
            headerLabel: 'Equipment Number',
            dataType: 'CHAR',
            order: 3,
            alignment: 'center',
            sort_order: 'asc',
            width: '20%',
            flag: 0
          };
        function updateMetaDataFunction(metaId, metaDataObj, moduleMetaId) {
          equipmentMetadata[metaId] = metaDataObj;
          return Observable.of(equipmentMetadata);
        }
        spyOn(service, 'updateEquipMetaData').and.callFake(updateMetaDataFunction);
        let listObs = service.updateEquipMetaData(id, metaObj, moduleId);
        listObs.subscribe((equipMetaLists) => {
          expect(equipMetaLists.length).toEqual(equipmentMetadata.length);
          expect(equipMetaLists[0]).toEqual(metaObj);
        });
      })
  );
  it('Should Call getEquipmentFilters to return Observable of Filter List Data',
    inject([
        DynModuleService
      ],
      (service: DynModuleService) => {
        let moduleID = 1;
        spyOn(service, 'getEquipmentListFilter')
          .and.returnValue(Observable.of(equipmentFilters));
        let listObs = service.getEquipmentListFilter(moduleID);
        listObs.subscribe((equipFilterLists) => {
          expect(equipFilterLists.length).toEqual(equipmentFilters.length);
          expect(equipFilterLists[0]).toEqual(equipmentFilters[0]);
        });
      })
  );
});
