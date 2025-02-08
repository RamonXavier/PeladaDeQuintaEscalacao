import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CardsFifaApi {
  constructor() {
  }

  public buscarCards(): string[]{
    let cards: string[] = [];
    cards =
    [
      'https://i.ibb.co/wZzZgfPd/CHAMPIONS-LEAGUE-RTTK-T23.png',
      'https://i.ibb.co/Q76GtKWw/futcard-liverpool-web-min.png',
      'https://i.ibb.co/45TjRHC/FUTURE-STARS-T23-min.png',
      'https://i.ibb.co/hFQFDvQH/gold1.png',
      'https://i.ibb.co/rGtc6sh6/gold12.png',
      'https://i.ibb.co/bj2SRKww/rugby.png',
      'https://i.ibb.co/P3nqYSQ/icon-24.png',
      'https://i.ibb.co/Txm21wJq/azul2.png',
      'https://i.ibb.co/kgPCwCL0/totw.png'
    ]
    return cards;
  }

  public buscarFrases(): string[]{
    let frases: string[] = [];
    frases =
    [
        "Bombástico!", "El Caçador", "Artilheiro", "Canhão", "Mágico", "Trovão", "Foguete", "Pantera", "Furacão", "Predador",
        "Gênio", "Invencível", "Rápido e Furioso", "Tormenta", "Leão", "Mestre do Drible", "Matador", "Lendário", "Monstro",
        "Rei da Área", "Fenômeno", "Ninja", "Tubarão", "Míssil", "Gigante", "Demolidor", "Goleador", "Zica das Galáxias",
        "Imparável", "Bala de Prata", "Chute Certeiro", "O Iluminado", "Showman", "Batedor de Elite", "Espartano", "Imperador",
        "Camisa 10", "Muralha", "Raio", "Sniper", "Águia", "Torpedo", "Astro", "Viking", "Encantador da Bola", "Guerreiro",
        "Trovador", "Fera", "Dinamite", "Coringa", "Assassino da Rede", "Flecha Azul", "Mão de Ouro", "Pé de Anjo", "Craque Nato",
        "Trovão Negro", "Motorzinho", "Rei do Passe", "Artilheiro Nato", "Bola de Fogo", "Gol de Placa", "Relâmpago",
         "Gênio da Bola", "Patrão da Área", "Cometa", "Vento Cortante", "Camisa 7", "Tanque", "Zagueiro de Aço", "Tigre",
         "El Patrón", "Mestre do Gol", "Míssil Humano", "Domador da Bola", "Terror da Zaga", "Encantador de Redes",
         "Pantera Negra", "Falcão Dourado", "Goleiro Voador", "O Infiltrador", "Cobra Criada", "Mestre do Toque",
         "Tigre Branco", "Rei do Drible", "Muralha Humana", "Fantasma da Área", "Leão Indomável", "Pistoleiro",
         "O Franco Atirador", "O Fantástico", "Chute Relâmpago", "O Maestro", "Fome de Gol", "Mestre da Caneta",
         "O Rei da Finalização", "Gênio Tático", "A Máquina", "Tanque Humano", "Relâmpago Azul", "Colosso",
         "O Matador", "Rei da Assistência", "Dono da Bola", "Camaleão", "O Maestro da Bola", "Pantera do Gramado"
    ]
    return frases;
  }
}
