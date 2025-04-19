import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { GeracaoTimeDto } from "../model/geracaoTimeDto.model";

@Injectable({
  providedIn: 'root'
})

export class GeracaoTimesApi {
  constructor(private http: HttpClient) {
  }

  public salvarTimesGerados(geracaoTime: GeracaoTimeDto): Observable<void> {
    return this.http.post<void>(environment.base_url_GeracaoTime, geracaoTime);
  }

  public buscarTimesGerados(): Observable<GeracaoTimeDto> {
    return this.http.get<GeracaoTimeDto>(environment.base_url_GeracaoTime+'1');
  }
}

