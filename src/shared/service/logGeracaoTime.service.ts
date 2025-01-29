import { CriarLoggeracaoTimeDto } from './../model/criarLoggeracaoTimeDto.model';
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { LogGeracaoTimeApi } from '../api/logGeracaoTime.api';

@Injectable({
  providedIn: 'root'
})

export class LogGeracaoTimeService {
  constructor
  (
    private _logGeracaoTimeApi: LogGeracaoTimeApi,
    private _toastService: ToastrService
  ) { }

  public buscarTodos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._logGeracaoTimeApi.buscarTodos().subscribe((retorno: any[]) => {
        resolve(retorno);
      }, erro => {
        this._toastService.error('', 'Houve uma falha ao buscar os Logs.', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
      });
    });
  }

  public criar(criarLoggeracaoTimeDto: CriarLoggeracaoTimeDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this._logGeracaoTimeApi.criar(criarLoggeracaoTimeDto).subscribe((retorno: void) => {
        resolve(retorno);
      }, erro => {
        this._toastService.error('', 'Houve uma falha ao criar log.', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
      });
    });
  }
}
