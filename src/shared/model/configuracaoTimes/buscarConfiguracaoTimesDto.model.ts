import { JogadorDto } from '../jogadorDto.model';

export class BuscarConfiguracaoTimesDto {
    id?: number;
    nome?: string;
    jogadores: JogadorDto[] = [];
    nota: number = 0;
    emblema?: string;

    constructor(init?: Partial<BuscarConfiguracaoTimesDto>) {
      Object.assign(this, init);
    }
}