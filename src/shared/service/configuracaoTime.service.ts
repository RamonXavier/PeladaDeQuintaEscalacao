import { Injectable } from '@angular/core';
import { ConfiguracaoTimeApi } from '../api/configuracaoTimes.api';
import { BuscarConfiguracaoTimesDto } from '../model/configuracaoTimes/buscarConfiguracaoTimesDto.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ConfiguracaoTimeService {
    constructor(private _configuracaoTimeApi: ConfiguracaoTimeApi, private _tosastrService: ToastrService) { }

    public buscar(): Promise<BuscarConfiguracaoTimesDto[]> {
      return new Promise((resolve, reject) => {
        this._configuracaoTimeApi.buscar().subscribe(data => {
            resolve(data);
        }, error => {
            reject(error);
            this._tosastrService.error("","Erro ao buscar configurações de time",  { toastClass: 'toast ngx-toastr', closeButton: true })
        });
      });
    }
}
