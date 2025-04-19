import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { BuscarConfiguracaoTimesDto } from "../model/configuracaoTimes/buscarConfiguracaoTimesDto.model";

@Injectable({
  providedIn: 'root'
})

export class ConfiguracaoTimeApi {
  constructor(private http: HttpClient) {
  }

  public buscar(): Observable<BuscarConfiguracaoTimesDto[]> {
    return this.http.get<BuscarConfiguracaoTimesDto[]>(environment.base_url_ConfiguracaoTime);
  }
}