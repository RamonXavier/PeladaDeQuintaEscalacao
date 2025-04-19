export class PlacarTimesDto {

    vitorias: number = 0;
    derrotas: number = 0;
    gols: number = 0;
    imagem?: string;
    nome?: string;
    id: number = 0;
    ativo?: boolean

    constructor(init?: Partial<PlacarTimesDto>) {
      Object.assign(this, init);
    }
}
