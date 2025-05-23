export class BuscarArtilhariaDto {
  id?: number;
  idJogador?: string;
  jogador?: string;
  janeiro: number = 0;
  fevereiro: number = 0;
  marco: number = 0;
  abril: number = 0;
  maio: number = 0;
  junho: number = 0;
  julho: number = 0;
  agosto: number = 0;
  setembro: number = 0;
  outubro: number = 0;
  novembro: number = 0;
  dezembro: number = 0;
  imagemJogador?: string;
  totalGols: number = 0;

  constructor(init?: Partial<BuscarArtilhariaDto>) {
    Object.assign(this, init);
  }
}
