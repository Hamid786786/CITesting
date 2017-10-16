import { TestBed, inject } from '@angular/core/testing';
import { InboxService } from './inbox.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExceptionService } from '../utils/exception.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

let inbox: InboxService;
let _exception: ExceptionService;
let _httpClient: HttpClient;
let checkInboxResourceSpy: jasmine.Spy;
let checkPrioritySpy: jasmine.Spy;
let readStatusSpy: jasmine.Spy;
let setFiltersDataSpy: jasmine.Spy;
let getFiltersDataSpy: jasmine.Spy;
let setInboxDefault: jasmine.Spy;
let getInboxDefault: jasmine.Spy;
let filterData = { searchByID: true };
let defaultInboxData: number = 1;

describe('Inbox Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [InboxService, HttpClient, ExceptionService]
    });

    _httpClient = TestBed.get(HttpClient);
    _exception = TestBed.get(ExceptionService);

    inbox = new InboxService(_httpClient, _exception);
  });

  it(
    'should inject the service and call',
    inject([InboxService], (service: InboxService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should return a resourse api', () => {
    checkInboxResourceSpy = spyOn(inbox, 'getResources').and.returnValue(
      Promise.resolve()
    );
    expect(inbox.getResources(<any> {})).toBeGreaterThanOrEqual;
  });

  it('should return an Observable<Array<Resources>>', () => {
    let dummyResource = {
      type: 'mail',
      equipmentIdentifier: 'Kevin Ma',
      equipmentDetails: 'Kevin ma has sent time sheet TS761 for your approval',
      receivedOn: 1501672270000,
      isPrioritySet: true,
      from: 'John Smith',
      to: ['Jayant saika', 'Jodie Uthappa'],
      greetings: 'Dear Jayant',
      contentBody: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum MAIL',
      dueDate: 1501672030000,
      priority: false,
      action: 'view',
      isRead: true,
      id: 1
    };
    inbox.getResources(1).subscribe((resourse) => {
      expect(resourse.length).toBe(10);
      expect(resourse).toContain(dummyResource);
    });
  });

  it('should return an Observable<Array<getInboxDetails>>', () => {
    let dummyResourceDetails = {
      type: 'mail',
      equipmentIdentifier: 'Kevin Ma',
      equipmentDetails: 'Kevin ma has sent time sheet TS761 for your approval',
      receivedOn: 1501672270000,
      isPrioritySet: true,
      from: 'John Smith',
      to: ['Jayant saika', 'Jodie Uthappa'],
      greetings: 'Dear Jayant',
      contentBody: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum MAIL',
      dueDate: 1501672030000,
      priority: false,
      action: 'view',
      isRead: true,
      id: 1
    };
    inbox.getInboxDetails(1).subscribe((resourseDetails) => {
      expect(resourseDetails).toEqual(dummyResourceDetails);
    });
  });

  it('should return an Observable for Filters', () => {
    let dummyFilter = {
      subFilterName: 'equipment',
      subFilterId: 'subfilter-1',
      displaySubFilterName: 'Equipment'
    };

    inbox.getInboxFilters().subscribe((filter) => {
      expect(filter.length).toBeGreaterThan(1);
      expect(filter).toContain(dummyFilter);
    });
  });

  it('should return a priority api', () => {
    checkPrioritySpy = spyOn(inbox, 'setPriority').and.returnValue(
      Promise.resolve()
    );
    expect(checkPrioritySpy).toBeDefined();
    expect(inbox.setPriority(<any> {}, <any> {})).toHaveBeenCalled;
  });

  it('should return a read mail api', () => {
    readStatusSpy = spyOn(inbox, 'setReadStatus').and.returnValue(
      Promise.resolve()
    );
    expect(readStatusSpy).toBeDefined();
    expect(inbox.setReadStatus(<any> {}, <any> {})).toHaveBeenCalled;
  });

  it('should set filters data', () => {
    setFiltersDataSpy = spyOn(inbox, 'setFilterDate').and.returnValue(
      Promise.resolve()
    );
    let setAppointment = inbox.setFilterDate('searchByID', true);
    expect(setFiltersDataSpy).toHaveBeenCalled();
  });

  it('should get an appointmentdate', () => {
    getFiltersDataSpy = spyOn(inbox, 'getFilterDate').and.callFake(() => {
      return filterData;
    });
    expect (inbox.getFilterDate()).toBe(filterData);
  });

  it('should set filters data', () => {
    setFiltersDataSpy = spyOn(inbox, 'setInboxDefault').and.returnValue(
      Promise.resolve(1)
    );
    let setAppointment = inbox.setInboxDefault(1);
    expect(setFiltersDataSpy).toHaveBeenCalled();
  });

  it('should get an appointmentdate', () => {
    getFiltersDataSpy = spyOn(inbox, 'getInboxDefault').and.callFake(() => {
      return defaultInboxData;
    });
    expect(inbox.getInboxDefault()).toBe(defaultInboxData);
  });
});
