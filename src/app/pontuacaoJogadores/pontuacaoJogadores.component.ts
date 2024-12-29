import { AniversariantesBackground } from '../../backgrounds/aniversariantes.background';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import jogadoresData from '../../assets/jogadores.json';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';

interface Jogador {
  id: number;
  nome: string;
  nota: number;
  coroa: boolean;
  img: string;
  pote: number;
  pontuacao: string;
}


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
  public jogadores: Jogador[] = [];
  public goleiros: Jogador[] = [];
  public imagemCardFifa: string = "https://i.ibb.co/3Nw177S/card-fifa.png";
  public imagemAvulso = 'https://i.ibb.co/DKgB6RP/cris.png';
  public desempenhosJogadores: any[] =
  [
    {nota:'🔼🔼🔼', active: false},
    {nota:'🔼🔼', active: false},
    {nota:'🔼', active: false},
    {nota:'➖', active: true},
    {nota:'🔻', active: false},
    {nota:'🔻🔻', active: false},
    {nota:'🔻🔻🔻', active: false}
  ];

  constructor (private toastr: ToastrService, private aniversariantesBackground: AniversariantesBackground){

  }


  ngOnInit(): void {
    this.carregarJogadoresDoJsonConfigurado();
  }

  private carregarJogadoresDoJsonConfigurado(): void {
    this.jogadores = (jogadoresData as any).jogadores;
    this.goleiros = (jogadoresData as any).goleiros;

    this.goleiros.forEach(goleiro => {
      this.jogadores.push(goleiro);
    });

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

  public pontuarJogadores(novosJogadores: Jogador[]): void{
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
            let novoJogador: Jogador = {
              id: jogador.id,
              img: 'https://sportrenders.com/wp-content/uploads/2023/10/Cristiano-Ronaldo-Render-PNG-Al-Nassr-Image-Sport-Renders-1.png',
              nome: jogador?.nome,
              coroa: jogador.coroa,
              nota: jogador?.nota,
              pote: jogador?.pote,
              pontuacao: jogador.pontuacao
            }
            jogador = novoJogador;
          }
    });
  }
}
