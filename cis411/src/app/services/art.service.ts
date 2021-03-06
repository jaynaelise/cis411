import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, AsyncSubject } from 'rxjs';
import { Art } from '../models/art.model';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from '../models/search-criteria.model';

@Injectable()
export class ArtService {
    private _httpClient: HttpClient;
    private defaultSearchCriteria: SearchCriteria = new SearchCriteria();
    public searchCriteria: BehaviorSubject<SearchCriteria> = new BehaviorSubject<SearchCriteria>(this.defaultSearchCriteria);
    public mediums: AsyncSubject<Array<any>> = new AsyncSubject<Array<any>>();
    public centuries: AsyncSubject<Array<any>> = new AsyncSubject<Array<any>>();
    public cultures: AsyncSubject<Array<any>> = new AsyncSubject<Array<any>>();


    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    getArtByMediumCenturyCulture(searchCriteria: SearchCriteria, pageNumber: number): Observable<any> {
        return this._httpClient
            .get<any>(`${environment.baseHarvardApi}object?apikey=${environment.harvardApiKey}&q=culture:${searchCriteria.Culture}&century=${searchCriteria.Century}&medium=${searchCriteria.Medium}&size=20&page=${pageNumber}`);
    }

    getCentury() {
        if (this.centuries.subscribe(res => { return res })) {
            
            return this._httpClient
                .get<any>(`${environment.baseHarvardApi}century?apikey=${environment.harvardApiKey}&size=300`);
        }
    }

    getArtByObjectId(objectId: string) {
        return this._httpClient
            .get<any>(`${environment.baseHarvardApi}object${objectId}?apikey=${environment.harvardApiKey}`);
    }

    getCultures(page: number) {
        return this._httpClient
            .get<any>(`${environment.baseHarvardApi}culture?apikey=${environment.harvardApiKey}&size=300&page=${page}`)
    }

    getMediums(page: number) {
        return this._httpClient
            .get<any>(`${environment.baseHarvardApi}medium?apikey=${environment.harvardApiKey}&size=300&page${page}`);
    }
}