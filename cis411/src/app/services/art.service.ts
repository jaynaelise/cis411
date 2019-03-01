import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Painting } from '../models/painting.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArtService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    getArtByClassificationCulture(culture: string, classification: string, timePeriod: string, pageNumber: number):Observable<any>{
        return this._httpClient.get<Array<any>>(`${environment.baseHarvardApi}/object?apikey=${environment.harvardApiKey}
        &q=culture:${culture}&classification=${classification}&size=20&page=${pageNumber}`);
    }

    getArtByObjectNumber(objectNumber: string){
        return this._httpClient.get<Array<any>>(`${environment.baseHarvardApi}/object?apikey=${environment.harvardApiKey}
        &objectnumber=${objectNumber}`);
    }

    getClassifications(page: number){
        return this._httpClient.get<Array<any>>(`${environment.baseHarvardApi}/classification?apikey=${environment.harvardApiKey}
        &size=20&page=${page}`);
    }

    getCultures(page: number){
        return this._httpClient.get<Array<any>>(`${environment.baseHarvardApi}/culture?apikey=${environment.harvardApiKey}
        &size=20&page=${page}`)
    }
}