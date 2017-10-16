import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ExceptionService } from "../utils/exception.service";
import { Observable } from "rxjs/Observable";
import { AuthService, NavService, LoginService } from "@pl-core/_services";
import "rxjs/add/observable/of";
import { ActivatedRoute, Params } from "@angular/router";

let _exception: ExceptionService;
let _httpClient: HttpClient;
let navService: NavService;

class ActivatedRouteClass {}
describe("Navigation Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        AuthService,
        NavService,
        { provide: ActivatedRoute, useClass: ActivatedRouteClass },
        LoginService,
        ExceptionService
      ]
    });

    _httpClient = TestBed.get(HttpClient);
    _exception = TestBed.get(ExceptionService);

    navService = new NavService(
      _httpClient,
      ActivatedRoute,
      AuthService,
      LoginService,
      _exception
    );
  });

  it(
    "should inject Navigation service",
    inject([NavService], (service: NavService) => {
      expect(service).toBeTruthy();
    })
  );
});
