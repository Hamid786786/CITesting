import { TestBed, inject } from "@angular/core/testing";
import { GlobalService } from "./global.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ExceptionService } from "../utils/exception.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
let _exception: ExceptionService;
let _httpClient: HttpClient;
let globalSearch: GlobalService;
let checkGlobalSearchApi: jasmine.Spy;
let setSearchDataSpy: jasmine.Spy;
let getSearchDataSpy: jasmine.Spy;
let setHeighlightIconSpy: jasmine.Spy;
let getHeighlightIconSpy: jasmine.Spy;
let searchDataParams = { q: "pros", type: "mail" };

describe("GlobalService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GlobalService, HttpClient, ExceptionService]
    });

    _httpClient = TestBed.get(HttpClient);
    _exception = TestBed.get(ExceptionService);

    globalSearch = new GlobalService(_httpClient, _exception);
  });

  it(
    "should inject global service",
    inject([GlobalService], (service: GlobalService) => {
      expect(service).toBeTruthy();
    })
  );

  it("should return a global search api", () => {
    checkGlobalSearchApi = spyOn(
      globalSearch,
      "getCommonSearch"
    ).and.returnValue(Promise.resolve());
    expect(globalSearch.getCommonSearch(<any>{}, <any>{})).toHaveBeenCalled;
  });

  it("should return  search api autosuggested data", () => {
    let dummySuggestion = {
      recordNumber: "1",
      title: "Kevin Ma",
      description: "Kevin ma has sent time sheet TS761 for your approval"
    };
    globalSearch.getCommonSearch("pro", "mail").subscribe(suggestion => {
      expect(suggestion.length).toBeGreaterThan(-1);
      expect(suggestion.result).toContain(dummySuggestion);
    });
  });

  it("should set search params", () => {
    setSearchDataSpy = spyOn(globalSearch, "setSearchData").and.returnValue(
      Promise.resolve({ q: "pros", type: "mail" })
    );
    let setSearchData = globalSearch.setSearchData({ q: "pros", type: "mail" });
    expect(getSearchDataSpy).toHaveBeenCalled;
  });

  it("should get search params", () => {
    getSearchDataSpy = spyOn(globalSearch, "getSearchData").and.callFake(() => {
      return searchDataParams;
    });
    let getsearchParams = globalSearch.getSearchData();
    expect(getsearchParams["q"]).toBe(searchDataParams["q"]);
    expect(getsearchParams["type"]).toBe(searchDataParams["type"]);
  });
});
