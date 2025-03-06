import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { ArtilhariaApi } from '../api/artilharia.api';
import { BuscarArtilhariaDto } from "../model/artilharia/buscarArtilhariaDto.model";

@Injectable({
  providedIn: 'root'
})

export class ArtilhariaService {
  constructor
  (
    private _artilhariaApi: ArtilhariaApi,
    private _toastService: ToastrService
  ) { }

  public buscarTodos(): Promise<BuscarArtilhariaDto[]> {
    return new Promise((resolve, reject) => {
      this._artilhariaApi.buscarTodos().subscribe((retorno: any[]) => {
        let dadosTratados: BuscarArtilhariaDto[] = [];

        retorno.forEach(element => {
          mapearApiParaObjeto(element);
        });

        function mapearApiParaObjeto(apiData: any): void {
          dadosTratados.push({
            janeiro: parseInt(apiData['JANEIRO']),
            fevereiro: parseInt(apiData['FEVEREIRO']),
            marco: parseInt(apiData['MARCO']),
            abril: parseInt(apiData['ABRIL']),
            maio: parseInt(apiData['MAIO']),
            junho: parseInt(apiData['JUNHO']),
            julho: parseInt(apiData['JULHO']),
            agosto: parseInt(apiData['AGOSTO']),
            setembro: parseInt(apiData['SETEMBRO']),
            outubro: parseInt(apiData['OUTUBRO']),
            novembro: parseInt(apiData['NOVEMBRO']),
            dezembro: parseInt(apiData['DEZEMBRO']),
            totalGols: 0,
            jogador: apiData['Jogador'],
            idJogador: apiData['IdJogador'],
            id: apiData['id'],
          })
        }
        dadosTratados.sort((a, b) => b.totalGols - a.totalGols);
        resolve(dadosTratados);
      }, erro => {
        this._toastService.error('', 'Houve uma falha ao buscar a artilharia.', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
      });
    });
  }
}
