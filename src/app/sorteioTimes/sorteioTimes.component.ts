import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import jogadoresData from './../../assets/jogadores.json'; // Importa o JSON
import html2canvas from 'html2canvas';

interface Jogador {
  nome: string;
  nota: number;
  coroa: boolean;
  img: string;
}

interface Time {
  nome: string;
  jogadores: string[];
  nota: number;
  imagem: string[];
}


// <a href="https://imgbb.com/"><img src="https://i.ibb.co/ByXgCFG/Almir.png" alt="Almir" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/XYgkTCC/bebe-leite.png" alt="bebe-leite" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/2KqM87k/ca-a-rato.png" alt="ca-a-rato" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/yVjbPyT/Coroa.png" alt="Coroa" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/LgfvBTb/Felipe.png" alt="Felipe" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/yqMPxMH/Flavin.png" alt="Flavin" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/dtnpkny/Junin.png" alt="Junin" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/D1RnLzn/leandro.png" alt="leandro" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/1ZGrGg8/L-o-colombo.png" alt="L-o-colombo" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/3pT4hzn/marcelo.png" alt="marcelo" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/BPXFBPw/Marcus.png" alt="Marcus" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/8zRvvVR/Markim.png" alt="Markim" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/7KHJNGs/Ramonzin.png" alt="Ramonzin" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/qr3gHHH/Rogerim.png" alt="Rogerim" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/f151WNg/siluieta-sf.png" alt="siluieta-sf" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/WWX681R/Tiguim.png" alt="Tiguim" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/ZNSB7px/wanderley.png" alt="wanderley" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/v4qzSFy/Weyder.png" alt="Weyder" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/L0rFFtL/z-ronildo.png" alt="z-ronildo" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/6yD2mxq/Augusto.png" alt="Augusto" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/MfRZDpz/LOGO-PELADA.png" alt="LOGO-PELADA" border="0"></a>

// <a href="https://imgbb.com/"><img src="https://i.ibb.co/PD1p9rT/boleiros-1.png" alt="boleiros-1" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/7zrnZLD/chuta-1.png" alt="chuta-1" border="0"></a>
// <a href="https://imgbb.com/"><img src="https://i.ibb.co/2q5D9Vr/donos-1.png" alt="donos-1" border="0"></a>
// <a href="https://ibb.co/gPpvZ5m"><img src="https://i.ibb.co/cCHbhGk/Futebol-Campo-de-Futebol-2-PNG.png" alt="Futebol-Campo-de-Futebol-2-PNG" border="0"></a>

@Component({
  selector: 'sorteioTimes',
  templateUrl: './sorteioTimes.component.html',
  styleUrls: ['./sorteioTimes.component.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class SorteioTimesComponent implements OnInit {
  jaGerouTimes: boolean = false;
  jogadores: Jogador[] = [];
  times: Time[] = [];
  nomeAntigo: string = ''; // Nome do jogador a ser substituído
  novoJogador: Jogador = { nome: '', nota: 0, coroa: false, img: 'https://i.ibb.co/f151WNg/siluieta-sf.png' }; // Novo jogador
  emblemasTimes: any[] =
  [
    'https://i.ibb.co/PD1p9rT/boleiros-1.png',
    'https://i.ibb.co/7zrnZLD/chuta-1.png',
    'https://i.ibb.co/2q5D9Vr/donos-1.png'
  ];


  ngOnInit(): void {
    this.carregarJogadores();
  }

  carregarJogadores(): void {
    this.jogadores = (jogadoresData as any).jogadores; // Atribui os jogadores do JSON ao array
  }

  gerarTimes(): void {
    const jogadoresCoroa = this.jogadores.filter((j) => j.coroa);
    const jogadoresNormais = this.jogadores.filter((j) => !j.coroa);

    if (jogadoresCoroa.length < 3) {
      console.error('Número insuficiente de jogadores com coroa!');
      return;
    }

    this.times = []; // Limpa times anteriores

    // Criar 3 times com 1 jogador coroa em cada
    const timesTemp: Time[] = [
      { nome: '1 - Boleiros e parceiros', jogadores: [], nota: 0, imagem: []},
      { nome: '2 - Chuta que é gol', jogadores: [], nota: 0, imagem: []},
      { nome: '3 - Os donos do jogo', jogadores: [], nota: 0, imagem: []},
    ];

    for (let i = 0; i < 3; i++) {
      const jogadorCoroa = jogadoresCoroa.splice(
        Math.floor(Math.random() * jogadoresCoroa.length),
        1
      )[0];
      timesTemp[i].jogadores.push(jogadorCoroa.nome + ' - ' + jogadorCoroa.nota);
      timesTemp[i].imagem.push(jogadorCoroa.img);
      timesTemp[i].nota += jogadorCoroa.nota;
    }

    // Distribuir os jogadores normais
    while (jogadoresNormais.length > 0) {
      for (const time of timesTemp) {
        if (jogadoresNormais.length === 0) break;

        const jogador = jogadoresNormais.splice(
          Math.floor(Math.random() * jogadoresNormais.length),
          1
        )[0];
        time.jogadores.push(jogador.nome + ' - ' + jogador.nota);
        time.imagem.push(jogador.img);
        time.nota += jogador.nota;
      }
    }
    this.jaGerouTimes = true;
    this.times = timesTemp;
  }

  onTrocarJogador(): void {
    this.trocarJogador(this.nomeAntigo, this.novoJogador);

    // Reseta os valores do formulário
    this.nomeAntigo = '';
    this.novoJogador = { nome: '', nota: 0, coroa: false, img: 'https://i.ibb.co/f151WNg/siluieta-sf.png' };
  }

  trocarJogador(nomeAntigo: string, novoJogador: Jogador): void {
    // Busca o índice do jogador antigo
    const index = this.jogadores.findIndex((j) => j.nome === nomeAntigo);

    if (index !== -1) {
      // Substitui o jogador antigo pelo novo
      this.jogadores[index] = novoJogador;
      console.log(`Jogador "${nomeAntigo}" foi substituído com sucesso!`);
    } else {
      console.error(`Jogador "${nomeAntigo}" não encontrado!`);
    }
  }

  async salvar() {
    const divs = document.querySelectorAll('.testec');
    for (let index = 0; index < 1; index++) {
      for (const div of Array.from(divs)) {
        const canvas = await html2canvas(div as HTMLElement, {
          useCORS: true, // Permite capturar imagens de URLs externas
          proxy: 'https://cors-anywhere.herokuapp.com/', // Opcional: Proxy para contornar problemas de CORS
        });
        const image = canvas.toDataURL('image/png');
        this.downloadImage(image, `sorteioDaSemana.png`);
        // this.downloadImage(image, `timesCriados${index}.png`);
        index++;
      }
    }
  }

  downloadImage(dataUrl: string, filename: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
}
