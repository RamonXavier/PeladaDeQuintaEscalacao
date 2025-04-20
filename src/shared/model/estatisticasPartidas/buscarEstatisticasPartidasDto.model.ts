import { PlacarTimesDto } from '../configuracaoTimes/placarTimesDto.model';
import { JogadorEstatisticaDto } from '../jogador/JogadorEstatisticaDto.model';

export class BuscarEstatisticasPartidasDto {
    id?: number;
    data?: string;
    jogadores?: JogadorEstatisticaDto[] = [];
    placar?: PlacarTimesDto[] = [];

    constructor(init?: Partial<BuscarEstatisticasPartidasDto>) {
      Object.assign(this, init);
    }
}
