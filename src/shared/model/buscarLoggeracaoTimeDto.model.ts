import { JogadorDto } from "./jogadorDto.model";

export class BuscarLogGeracaoTimeDto {
  jogadores?: JogadorDto[] = [];
  nome?: string;
  dataGeracaoTime?: string | Date;
  nota?: string;
  id?: number;

  constructor(init?: Partial<BuscarLogGeracaoTimeDto>) {
    Object.assign(this, init);
  }
}
