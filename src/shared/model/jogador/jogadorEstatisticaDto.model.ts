export class JogadorEstatisticaDto {

    id?: number;
    nome?: string;
    time?: number;
    gols?: number;

    constructor(init?: Partial<JogadorEstatisticaDto>) {
      Object.assign(this, init);
    }
}