import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeracaoTimeService } from '../../shared/service/geracaoTime.service';
import { GeracaoTimeDto } from '../../shared/model/geracaoTimeDto.model';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../../shared/model/jogador.model';
import { ConfiguracaoTimeService } from '../../shared/service/configuracaoTime.service';
import { PlacarTimesDto } from '../../shared/model/configuracaoTimes/placarTimesDto.model';
import { TimeDto } from '../../shared/model/timeDto.model';
import { JogadorDto } from '../../shared/model/jogadorDto.model';
import { BuscarEstatisticasPartidasDto } from '../../shared/model/estatisticasPartidas/buscarEstatisticasPartidasDto.model';
import { EstatisticaPartidaService } from '../../shared/service/estatisticaPartida.service';

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
  public primeiraPartida: boolean = true;
  public timeQueAcabouDeEntrar?: TimeDto;
  public jogadorSelecionado?: JogadorDto;
  private modalRef?: any;
  public historicoEstatisticas: BuscarEstatisticasPartidasDto[] = [];
  public historicoEstatisticasSalvas: any[] = [];
  private senhas = ["fleipe33", "12ra", "flavim11"];
  public senhaDigitada: string = '';

  constructor(
    private _geracaoTimeService: GeracaoTimeService,
    private toastr: ToastrService,
    private _configuracaoTimeService: ConfiguracaoTimeService,
    private _estatisticaPartidaService: EstatisticaPartidaService
  ) { }

  ngOnInit(): void {
    this.configurarCarregamentoDeTimes();
    //this.carregarHistoricosEstatisticas();
  }

  private carregarHistoricosEstatisticas() {
    this._estatisticaPartidaService.buscarTodos().then((resultado) => {
      this.historicoEstatisticasSalvas = resultado;
    });
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

  private definirTimesAtivosEInativos(): void {
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
    this.diminuirTempoCronometro();
  }

  private diminuirTempoCronometro(): void {
    this.intervalo = setInterval(() => {
      this.tempoRestante--;
      this.atualizarTempoFormatado();

      if (this.tempoRestante <= 0) {
        this.pararCronometro();
        this.finalizarPartida();
      }

    }, 1000);
  }

  public pausarRetomarCronometro(): void {
    if (!this.cronometroAtivo)
      return;

    this.pausado = !this.pausado;
    if (this.pausado) {
      clearInterval(this.intervalo);
      this.toastr.info('Cronômetro pausado', '⏸️');
    } else {
      this.diminuirTempoCronometro();
      this.toastr.success('Cronômetro retomado', '▶️');
    }
  }

  public selecionarTimePerdedor(timePerdedor: number): void {
    this.timeQueAcabouDeEntrar = this.timeDeFora;
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

  public getTimesParaJogo(): TimeDto[] {
    if (!this.geracaoTime) return [];
    return this.geracaoTime.times.slice(0, 2);
  }

  public incrementarGol(jogador: JogadorDto): void {
    if (!this.cronometroAtivo)
      return;

    this.jogadorSelecionado = jogador;
    // @ts-ignore
    const modal = new bootstrap.Modal(document.getElementById('confirmarGolModal'));
    this.modalRef = modal;

    const cronometroEstadoAnterior = this.pausado;
    if (!this.pausado) {
      this.pausarRetomarCronometro();
    }
    const modalElement = document.getElementById('confirmarGolModal');
    modalElement?.addEventListener('hidden.bs.modal', () => {
      if (!cronometroEstadoAnterior && this.pausado) {
        this.pausarRetomarCronometro();
      }
      this.jogadorSelecionado = undefined;
    });

    modal.show();
  }

  public confirmarGol(): void {
    if (this.jogadorSelecionado) {
      this.jogadorSelecionado.gols = ((parseInt(this.jogadorSelecionado.gols as string) || 0) + 1).toString();
      const time = this.timesJogando.find(t => t.jogadores.some(j => j.id === this.jogadorSelecionado?.id));
      if (time) {
        const placarTime = this.placar.find(p => p.id === time.id);
        if (placarTime) {
          placarTime.gols++;
        }
      }
    }
    this.modalRef?.hide();
  }

  public removerGol(): void {
    if (this.jogadorSelecionado && parseInt(this.jogadorSelecionado!.gols!) > 0) {
      this.jogadorSelecionado.gols = ((parseInt(this.jogadorSelecionado.gols as string) || 0) - 1).toString();
      const time = this.timesJogando.find(t => t.jogadores.some(j => j.id === this.jogadorSelecionado?.id));
      if (time) {
        const placarTime = this.placar.find(p => p.id === time.id);
        if (placarTime && placarTime.gols >0) {
          placarTime.gols--;
        }
      }
    }
    this.modalRef?.hide();
  }

  public comecarNovaPartida(): void {
    this.placar.forEach(time => time.gols = 0);
    this.primeiraPartida = false;
    this.comecarPelada();
  }

  public tratarResultados(): void {
    let timePerdedor;
    const golsTime1 = this.placar.find(p => p.id === this.timesJogando[0].id)?.gols || 0;
    const golsTime2 = this.placar.find(p => p.id === this.timesJogando[1].id)?.gols || 0;

    if (golsTime1 === golsTime2 && this.primeiraPartida)
      this.mostrarSelecaoTimePerdedor = true;
    else if (golsTime1 === golsTime2 && !this.primeiraPartida){
      const timeQueJaEstavaJogando = this.timesJogando.find(time => time.id !== this.timeQueAcabouDeEntrar?.id)!;
      this.selecionarTimePerdedor(timeQueJaEstavaJogando.id!);
    }
    else if (golsTime1 !== golsTime2) {
      timePerdedor = golsTime1 < golsTime2
      ? this.timesJogando[0]
      : this.timesJogando[1];
      this.selecionarTimePerdedor(timePerdedor.id!);
    }
  }

  public finalizarPartida(): void {
    this.registrarEstatisticasPartida();
    this.tratarResultados();
    this.zerarGolsDosTimesNoFinalDaPartida();
    this.primeiraPartida = false;
  }

  private registrarEstatisticasPartida(): void {
    const estatisticas: BuscarEstatisticasPartidasDto = {
      data: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      placar: this.placar.map(time => ({
        id: time.id,
        nome: `Time ${time.id}`,
        gols: time.gols,
        vitorias: time.vitorias,
        derrotas: time.derrotas,
        ativo: time.ativo
      })),
      jogadores: this.geracaoTime?.times.flatMap(time =>
        time.jogadores.map(jogador => ({
          id: jogador.id,
          nome: jogador.nome,
          time: time.id,
          gols: parseInt(jogador.gols as string) || 0
        }))
      ).filter(jogador => jogador.gols > 0)
    };

    this.historicoEstatisticas.push(estatisticas);
    this._estatisticaPartidaService.atualizar(this.historicoEstatisticas).then(() => {
      this.toastr.success('Estatisticas atualizadas', '⚽');
      //this.carregarHistoricosEstatisticas();
    })
  }

  private zerarGolsDosTimesNoFinalDaPartida(): void {
    this.placar.forEach(timePlacar => {
      timePlacar.gols = 0;
    });
  }

  public finalizarJogo(): void {
    // @ts-ignore
    const modal = new bootstrap.Modal(document.getElementById('validarSenhaModal'));
    modal.show();
  }

  public validarSenhaEFinalizar(): void {
    if (this.senhas.includes(this.senhaDigitada)) {
      this._estatisticaPartidaService.atualizarFinal(this.historicoEstatisticas).then(() => {
        this.toastr.success('Estatísticas atualizadas', '⚽');
      });
      const modalElement = document.getElementById('validarSenhaModal');
      // @ts-ignore
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
      this.senhaDigitada = '';
    } else {
      this.toastr.error('Senha incorreta!', '🚫');
    }
  }
}
