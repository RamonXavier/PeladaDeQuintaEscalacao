import { TimeDto } from './timeDto.model';

export class GeracaoTimeDto {
    public dataGeracao: Date;
    public times: TimeDto[];

    constructor(dataGeracao: Date, times: TimeDto[]) {
        this.dataGeracao = dataGeracao;
        this.times = times;
    }
}
