import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { JogadorDto } from '../../shared/model/jogadorDto.model';
import { TimeDto } from '../../shared/model/timeDto.model';
import { LogGeracaoTimeService } from '../../shared/service/logGeracaoTime.service';
import { CriarLoggeracaoTimeDto } from '../../shared/model/criarLoggeracaoTimeDto.model';
import { JogadoresService } from '../../shared/service/jogadores.service';

@Component({
  selector: 'sorteioTimes',
  templateUrl: './sorteioTimes.component.html',
  styleUrls: ['./sorteioTimes.component.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})

export class SorteioTimesComponent implements OnInit {
  public jaGerouTimes: boolean = false;
  public editandoJogadores: boolean = false;
  public jogadores: JogadorDto[] = [];
  public times: TimeDto[] = [];
  public imagemCardFifa: string = "https://i.ibb.co/3Nw177S/card-fifa.png";
  public imagemAvulso = 'https://i.ibb.co/DKgB6RP/cris.png';
  public emblemasTimes: any[] =
  [
    'https://i.ibb.co/PD1p9rT/boleiros-1.png',
    'https://i.ibb.co/7zrnZLD/chuta-1.png',
    'https://i.ibb.co/2q5D9Vr/donos-1.png'
  ];

  constructor (
    private toastr: ToastrService,
    private _jogadoresService: JogadoresService,
    private _logGeracaoTimeService: LogGeracaoTimeService){ }


  ngOnInit(): void {
    this.carregarJogadoresDoJsonConfigurado();
  }

  private carregarJogadoresDoJsonConfigurado(): void {
    this.jogadores = [];
    this.jogadores = this._jogadoresService.buscarMensalistas();
  }

  public gerarTimes(): void {
    const jogadoresCoroas = this.jogadores.filter((j) => j.coroa);
    const jogadoresComuns = this.jogadores.filter((j) => !j.coroa);

    if (jogadoresCoroas.length < 3) {
      this.toastr.error('Número insuficiente de jogadores coroas', '😢Ops!');
      this.toastr.error('Entre em contato com o caça rato.', '');
      return;
    }

    if (jogadoresComuns.length < 12) {
      this.toastr.error('Número insuficiente de jogadores comuns', '😢Ops!');
      this.toastr.error('Entre em contato com o caça rato.', '');
      return;
    }

    this.times = [];

    const timesPadrao: TimeDto[] = [
      { nome: '1 - Boleiros e parceiros', jogadores: [], nota: 0, imagem: []},
      { nome: '2 - Chuta que é gol', jogadores: [], nota: 0, imagem: []},
      { nome: '3 - Os donos do jogo', jogadores: [], nota: 0, imagem: []},
    ];

    this.distribuirJogadoresCoroasNosTimes(timesPadrao, jogadoresCoroas);
    this.distribuirJogadoresComunsNosTimes(timesPadrao, jogadoresComuns);



    this.jaGerouTimes = true;
    this.times = timesPadrao;

    let logTimeGerado: CriarLoggeracaoTimeDto[] = [];
    this.times.forEach(timePercorrido => {
      let logTimeGeradoPercorrido: CriarLoggeracaoTimeDto =
      {
        dataGeracaoTime: new Date(),
        jogadores: timePercorrido.jogadores,
        nome: timePercorrido.nome,
        nota: timePercorrido.nota.toString()
      }
      logTimeGerado.push(logTimeGeradoPercorrido)
    });

    this._logGeracaoTimeService.criar(logTimeGerado).then(resultado =>  {
      this.toastr.success('Weeeeaaaa!!!😎');
    })
    this.toastr.success('Os 3 times foram criados', '🚀Tudo certo!🚀');
  }

  private distribuirJogadoresCoroasNosTimes(timesPadrao: TimeDto[], jogadoresCoroas: JogadorDto[]):void {
    let jogadoresCoroasDisponiveis: JogadorDto[] = [];
    let jogadoresCoroasJaSelecionados: any[] = [];

    for (let i = 0; i < 3; i++) {
      jogadoresCoroasDisponiveis = jogadoresCoroas.filter(x => !jogadoresCoroasJaSelecionados.includes(x.id));
      const jogadorCoroa = jogadoresCoroasDisponiveis.splice(Math.floor(Math.random() * jogadoresCoroasDisponiveis.length), 1)[0];
      jogadoresCoroasJaSelecionados.push(jogadorCoroa.id);

      timesPadrao[i].jogadores.push(jogadorCoroa);
      timesPadrao[i].imagem.push(jogadorCoroa.img);
      timesPadrao[i].nota += jogadorCoroa.nota;
    }
  }

  private distribuirJogadoresComunsNosTimes(timesPadrao: TimeDto[], jogadoresNormais: JogadorDto[]): void {
    let jogadoresNormaisDisponiveis: JogadorDto[] = [];
    let jogadoresNormaisJaSelecionados: number[] = [];

    const quantidadeMaximaJogadoresNoTime = 5;

    for (const timePercorrido of timesPadrao) {
      let potesJaAdicionados: string[] = [];
      while (timePercorrido.jogadores.length < quantidadeMaximaJogadoresNoTime) {
        jogadoresNormaisDisponiveis = jogadoresNormais.filter(x => !jogadoresNormaisJaSelecionados.includes(x.id) && !potesJaAdicionados.includes(x.pote!));
        const jogadorParaAdicionarAoTime = jogadoresNormaisDisponiveis.splice(Math.floor(Math.random() * jogadoresNormaisDisponiveis.length), 1)[0];

        jogadoresNormaisJaSelecionados.push(jogadorParaAdicionarAoTime.id);
        potesJaAdicionados.push(jogadorParaAdicionarAoTime.pote!);

        timePercorrido.jogadores.push(jogadorParaAdicionarAoTime);
        timePercorrido.imagem.push(jogadorParaAdicionarAoTime.img);
        timePercorrido.nota += jogadorParaAdicionarAoTime.nota;
      }
    }
  }

  async salvar(): Promise<void> {
    const divs = document.querySelectorAll('.testec');
    for (let index = 0; index < 1; index++) {
      for (const div of Array.from(divs)) {
        const canvas = await html2canvas(div as HTMLElement, {
          useCORS: true, // Permite capturar imagens de URLs externas
          proxy: 'https://cors-anywhere.herokuapp.com/', // Opcional: Proxy para contornar problemas de CORS
        });
        const image = canvas.toDataURL('image/png');
        this.downloadImage(image, `sorteioDaSemana.png`);
        index++;
      }
    }
  }

  public editarJogadores(novosJogadores: JogadorDto[]): void{
    this.jogadores = novosJogadores;
    this.toastr.success('Os jogadores foram editados', '🚀Tudo certo!🚀');
  }

  private downloadImage(dataUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }

  public alterarImagemJogador(id: number): void{

    this.jogadores.forEach(jogador => {
          if(jogador.id == id){
            let novoJogador: JogadorDto = {
              id: jogador.id,
              img: 'https://sportrenders.com/wp-content/uploads/2023/10/Cristiano-Ronaldo-Render-PNG-Al-Nassr-Image-Sport-Renders-1.png',
              nome: jogador?.nome,
              coroa: jogador.coroa,
              nota: jogador?.nota,
              pote: jogador?.pote
            }
            jogador = novoJogador;
          }
    });

    this.times = [];
  }
}
