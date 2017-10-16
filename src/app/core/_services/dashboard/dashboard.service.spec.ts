import { TestBed, inject } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import {ExceptionService} from '../utils/exception.service';
import {CONFIG} from '@pl-core/_config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
let dashboardRes = [
  {
    id: 10,
    type: 'image',
    title: 'Graph',
    w: 1,
    h: 1,
    dragAndDrop: true,
    resizable: true,
    content: {
      src: '/assets/img/graph2.png'
    }
  },
  {
    id: 15,
    type: 'video',
    title: 'Sample Video',
    w: 1,
    h: 1,
    dragAndDrop: true,
    resizable: true,
    content: {
      src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
    }
  },
  {
    id: 16,
    type: 'audio',
    title: 'Sample Audio',
    w: 1,
    h: 1,
    dragAndDrop: true,
    resizable: true,
    content: {
      src: 'http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3'
    }
  },
  {
    id: 11,
    type: 'iframe',
    title: 'Prospecta',
    w: 1,
    h: 1,
    dragAndDrop: true,
    resizable: true,
    content: {
      url: 'https://www.prospecta.com/mdo-solution.html'
    }
  },
  {
    id: 12,
    type: 'carousel',
    title: 'Carousel',
    w: 1,
    h: 1,
    dragAndDrop: true,
    resizable: true,
    content: {
      slides: [
        {
          description: 'Dummy 1',
          url: 'assets/img/carousel1.jpg',
          state: 'current'
        },
        {
          description: 'Dummy 2',
          url: 'assets/img/carousel2.jpg',
          state: 'right'
        },
        {
          description: 'Dummy 3',
          url: 'assets/img/carousel3.jpg',
          state: 'right'
        }
      ]
    }
  },
  {
    id: 13,
    type: 'iframe',
    title: 'Connekthub',
    w: 1,
    h: 1,
    dragAndDrop: true,
    resizable: true,
    content: {
      url: 'https://www.connekthub.com/'
    }
  },
  {
    id: 14,
    type: 'carousel',
    title: 'Test Title',
    w: 1,
    h: 1,
    subtitle: 'Test Sub Title',
    dragAndDrop: true,
    resizable: true,
    content: {
      slides: [
        {
          description: 'Slide 1',
          url: 'http://placehold.it/400x900/ff0000/ffffff',
          state: 'current'
        },
        {
          description: 'Slide 2',
          url: 'http://placehold.it/400x900/00ff00/ffffff',
          state: 'right'
        },
        {
          description: 'Slide 3',
          url: 'http://placehold.it/400x900/0000ff/ffffff',
          state: 'right'
        }
      ]
    }
  }
];
describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService, ExceptionService]
    });
  });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
  it('Should Call getResources to return Observable of widgets data',
    inject([
        DashboardService, HttpTestingController
      ],
      (service: DashboardService, httpMock: HttpTestingController ) => {
        let page = 1;
        let count = 3;
        service.getResources(page, count).subscribe((widgets) => {
          expect(widgets.length).toEqual(3);
          expect(widgets[0]).toEqual(dashboardRes[0]);
        });
        let dashboardRequest = httpMock.expectOne(`${CONFIG.urls.dashboardresources}?_page=1&_limit=3`);
        dashboardRequest.flush(dashboardRes.slice(0, 3));
        httpMock.verify();
      })
  );
});
