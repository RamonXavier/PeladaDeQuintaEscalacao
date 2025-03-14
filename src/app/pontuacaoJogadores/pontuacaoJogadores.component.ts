import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { JogadoresService } from '../../shared/service/jogadores.service';
import { JogadorDto } from '../../shared/model/jogadorDto.model';

@Component({
  selector: 'pontuacaoJogadores',
  templateUrl: './pontuacaoJogadores.component.html',
  styleUrls: ['./pontuacaoJogadores.component.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})

export class PontuacaoJogadoresComponent implements OnInit {
  public jaGerouNota:boolean = false;
  public editandoJogadores: boolean = false;
  public jogadores: JogadorDto[] = [];
  public goleiros: JogadorDto[] = [];
  public imagemCardFifa: string = "https://i.ibb.co/3Nw177S/card-fifa.png";
  public imagemAvulso = 'https://i.ibb.co/DKgB6RP/cris.png';

  constructor (private toastr: ToastrService, private _jogadoresService: JogadoresService){
  }


  ngOnInit(): void {
    this.carregarJogadoresDoJsonConfigurado();
  }

  private carregarJogadoresDoJsonConfigurado(): void {
    this.jogadores = [];
    this.jogadores = this._jogadoresService.buscarMensalistas();
    this.goleiros = this._jogadoresService.buscarGoleiros();

    this.jogadores = [...this.jogadores, ...this.goleiros];
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
        this.downloadImage(image, `pontuaçãoDaSemana.png`);
        index++;
      }
    }
  }

  public pontuarJogadores(novosJogadores: JogadorDto[]): void{
    this.jogadores = novosJogadores;
    this.toastr.success('Os jogadores foram pontuados', '🚀Tudo certo!🚀');
    this.jaGerouNota = true;
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
              pote: jogador?.pote,
              pontuacao: jogador.pontuacao,
              gols: jogador.gols
            }
            jogador = novoJogador;
          }
    });
  }
}
