import { TestBed, inject } from '@angular/core/testing';
import { AppointmentService } from './appointment.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExceptionService } from '../utils/exception.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
let _exception: ExceptionService;
let _httpClient: HttpClient;
let appointment: AppointmentService;
let checkGetAppointmentSpy: jasmine.Spy;
let checkGetAppointmentDetailsSpy: jasmine.Spy;
let setAppointmentDateSpy: jasmine.Spy;
let getAppointmentDateSpy: jasmine.Spy;
let selectedDate = { date: 1499365800000 };

describe('AppointmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppointmentService, HttpClient, ExceptionService]
    });

    _httpClient = TestBed.get(HttpClient);
    _exception = TestBed.get(ExceptionService);

    appointment = new AppointmentService(_httpClient, _exception);
  });

  it(
    'should inject appointment service',
    inject([AppointmentService], (service: AppointmentService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should return a appointment api', () => {
    checkGetAppointmentSpy = spyOn(
      appointment,
      'getAppointments'
    ).and.returnValue(Promise.resolve());
    expect(appointment.getAppointments(<any> {}, <any> {})).toHaveBeenCalled;
  });

  it('should return a appointment details api', () => {
    checkGetAppointmentDetailsSpy = spyOn(
      appointment,
      'getAppointmentDetails'
    ).and.returnValue(Promise.resolve());
    expect(appointment.getAppointmentDetails(<any> {})).toHaveBeenCalled;
  });

  it('should return an appointments data', () => {
    let dummyAppointment = {
      id: 6,
      date: '1499365800000',
      startTime: '10:00am',
      endTime: '11:00pm',
      message: 'have to discuss with Sita',
      attendees: 'ken, ley',
      duration: 1,
      destination: 'Prose ,Gurgaon'
    };
    appointment.getAppointments(1499365800000, 1).subscribe((appointments) => {
      expect(appointments.length).toBeGreaterThan(1);
      expect(appointments).toEqual(dummyAppointment);
    });
  });

  it('should return an detailAppoitments data', () => {
    let dummyDetailsAppointment = {
      id: 6,
      date: '1499365800000',
      startTime: '10:00am',
      endTime: '11:00pm',
      message: 'have to discuss with Sita',
      attendees: 'ken, ley',
      duration: 1,
      destination: 'Prose ,Gurgaon'
    };
    appointment.getAppointmentDetails(6).subscribe((appointmentDetail) => {
      expect(appointmentDetail).toEqual(dummyDetailsAppointment);
    });
  });

  it('should set an appointmentdate', () => {
    setAppointmentDateSpy = spyOn(
      appointment,
      'setSelectedDate'
    ).and.returnValue(Promise.resolve(1499365800000));
    let setAppointment = appointment.setSelectedDate(1499365800000);
    expect(setAppointmentDateSpy).toHaveBeenCalled();
  });

  it('should get an appointmentdate', () => {
    getAppointmentDateSpy = spyOn(
      appointment,
      'getSelectedDate'
    ).and.callFake(() => {
      return selectedDate;
    });
    let getAppointment = appointment.getSelectedDate();
    expect(getAppointment['date']).toEqual(selectedDate['date']);
  });
});
