import { Injectable } from '@angular/core';
import { GeracaoTimeDto } from '../model/geracaoTimeDto.model';
import { TimeDto } from '../model/timeDto.model';
import { GeracaoTimesApi } from '../api/geracaoTimes.api';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class GeracaoTimeService {
    constructor(private _geracaoTimesApi: GeracaoTimesApi, private toastr: ToastrService) { }

    public atualizarTimesGerados(times: TimeDto[]): Promise<any> {
      const geracaoTime = new GeracaoTimeDto(new Date(), times);
      return new Promise((resolve, reject) => {
        this._geracaoTimesApi.atualizarTimesGerados(geracaoTime).subscribe(data => {
            resolve(data);
        }, error => {
            reject(error);
        });
      });
    }

    public buscarTimesCriados(): Promise<GeracaoTimeDto> {
        return new Promise((resolve, reject) => {
            this._geracaoTimesApi.buscarTimesGerados().subscribe(data => {
                resolve(data);
            }, error => {
                this.toastr.error('Erro ao buscar os times', '😢Ops!');
                reject(error);
            });
        });
    }
}
