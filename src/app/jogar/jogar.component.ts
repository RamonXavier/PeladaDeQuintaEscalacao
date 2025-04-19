import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeracaoTimeService } from '../../shared/service/geracaoTime.service';
import { GeracaoTimeDto } from '../../shared/model/geracaoTimeDto.model';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../../shared/model/jogador.model';
import { ConfiguracaoTimeService } from '../../shared/service/configuracaoTime.service';
import { PlacarTimesDto } from '../../shared/model/configuracaoTimes/placarTimesDto.model';
import { TimeDto } from '../../shared/model/timeDto.model';

@Component({
  selector: 'app-jogar',
  templateUrl: './jogar.component.html',
  styleUrls: ['./jogar.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class JogarComponent implements OnInit {
  public geracaoTime: GeracaoTimeDto | null = null;
  public timesJogando: TimeDto[] = [];
  public timeDeFora?: TimeDto;
  public carregando: boolean = true;
  public tempoRestante: number = 360; // 6 minutos em segundos
  public cronometroAtivo: boolean = false;
  public tempoFormatado: string = '06:00';
  private intervalo: any;
  public mostrarSelecaoTimePerdedor: boolean = false;
  public timesFora: Jogador[][] = [];
  public pausado: boolean = false;
  public placar: PlacarTimesDto[] = [];

  constructor(
    private _geracaoTimeService: GeracaoTimeService,
    private toastr: ToastrService,
    private _configuracaoTimeService: ConfiguracaoTimeService
  ) { }

  ngOnInit(): void {
    this.configurarCarregamentoDeTimes();
  }

  private async configurarCarregamentoDeTimes(): Promise<void> {
    this.carregando = true;
    this._geracaoTimeService.buscarTimesCriados()
      .then((geracaoTime: GeracaoTimeDto) => {
        this.geracaoTime = geracaoTime;
        this.geracaoTime.times[0].id = 1;
        this.geracaoTime.times[1].id = 2;
        this.geracaoTime.times[2].id = 3;
        this.carregarPlacarDeTimes();
      })
      .finally(() => {
        this.carregando = false;
      });
  }

  private definirTimesAtivosEInativos() {
    let idTimeDeFora = this.placar.find(x=>!x.ativo)?.id;
    this.timeDeFora = this.geracaoTime?.times.find(x=>x.id == idTimeDeFora);

    this.timesJogando = [];
    let timesAtivos = this.placar.filter(x => x.ativo);
    timesAtivos.forEach(timeAtivo => {
      let timeEncontrado = this.geracaoTime!.times.find(x => x.id == timeAtivo.id);
      this.timesJogando.push(timeEncontrado!);
    });
  }

  private carregarPlacarDeTimes(): void {
    this._configuracaoTimeService.buscar().then((configuracoesTimes) => {
      configuracoesTimes.forEach(time => {
        this.placar.push({
          derrotas: 0,
          vitorias: 0,
          id: time.id!,
          imagem: time.emblema,
          nome: time.nome,
          ativo: time.id === 1 || time.id === 2,
          gols: 0
        });
      });
      this.definirTimesAtivosEInativos();
    });
  }

  public comecarPelada(): void {
    if (this.cronometroAtivo) return;

    this.cronometroAtivo = true;
    this.tempoRestante = 5//360;
    this.atualizarTempoFormatado();

    this.intervalo = setInterval(() => {
      this.tempoRestante--;
      this.atualizarTempoFormatado();

      if (this.tempoRestante <= 0) {
        this.pararCronometro();
        this.mostrarSelecaoTimePerdedor = true;
        this.toastr.info('Selecione qual time perdeu para substituição', '⏰');
      }
    }, 1000);
  }

  public pausarRetomarCronometro(): void {
    if (!this.cronometroAtivo) return;

    this.pausado = !this.pausado;
    if (this.pausado) {
      clearInterval(this.intervalo);
      this.toastr.info('Cronômetro pausado', '⏸️');
    } else {
      this.intervalo = setInterval(() => {
        this.tempoRestante--;
        this.atualizarTempoFormatado();

        if (this.tempoRestante <= 0) {
          this.pararCronometro();
          this.mostrarSelecaoTimePerdedor = true;
          this.toastr.info('Selecione qual time perdeu para substituição', '⏰');
        }
      }, 1000);
      this.toastr.success('Cronômetro retomado', '▶️');
    }
  }

  public selecionarTimePerdedor(timePerdedor: number): void {
    this.placar.forEach(timeMontado => {

      if(timeMontado.id == timePerdedor)
        timeMontado.derrotas++;

      if(timeMontado.ativo && timeMontado.id != timePerdedor)
        timeMontado.vitorias++;

      timeMontado.ativo = timeMontado.id != timePerdedor;
    });
    this.definirTimesAtivosEInativos();
    this.mostrarSelecaoTimePerdedor = false;
    this.toastr.success('Time substituído com sucesso!', '🔄');
  }

  private pararCronometro(): void {
    clearInterval(this.intervalo);
    this.cronometroAtivo = false;
  }

  private atualizarTempoFormatado(): void {
    const minutos = Math.floor(this.tempoRestante / 60);
    const segundos = this.tempoRestante % 60;
    this.tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  public getTimesParaJogo(): any[] {
    if (!this.geracaoTime) return [];
    return this.geracaoTime.times.slice(0, 2);
  }
}
