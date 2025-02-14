import { Injectable } from "@angular/core";
import { JogadorDto } from "../model/jogadorDto.model";

@Injectable({
  providedIn: 'root'
})

export class JogadoresApi {
  constructor() {
  }

  public buscarMensalistas(): JogadorDto[]{
    let mensalistas: JogadorDto[] = [];
    mensalistas = [
      {
          "id": 1,
          "nome": "FLAVIN",
          "nota": 9.2,
          "coroa": false,
          "img":"https://i.ibb.co/yqMPxMH/Flavin.png",
          "pote":"1",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 2,
          "nome": "LÉO COLOMBO",
          "nota": 9.8,
          "coroa": false,
          "img":"https://i.ibb.co/1ZGrGg8/L-o-colombo.png",
          "pote":"1",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 3,
          "nome": "CAÇA RATO",
          "nota": 8.4,
          "coroa": false,
          "img":"https://i.ibb.co/2KqM87k/ca-a-rato.png",
          "pote":"1",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 4,
          "nome": "RAPHAEL RUFINO",
          "nota": 7.8,
          "coroa": false,
          "img": "https://i.ibb.co/HDz6f3GQ/Raphael-Rufino.png",
          "pote":"2",
          "pontuacao":"➖",
          "gols":"0"
      },
      // {
      //     "id": 4,
      //     "nome": "MARKIM",
      //     "nota": 8.8,
      //     "coroa": false,
      //     "img":"https://i.ibb.co/8zRvvVR/Markim.png",
      //     "pote":"2",
      //     "pontuacao":"➖",
      //     "gols":"0"
      // },
      {
          "id": 5,
          "nome": "JUNIN",
          "nota": 8.6,
          "coroa": false,
          "img":"https://i.ibb.co/dtnpkny/Junin.png",
          "pote":"2",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 6,
          "nome": "TIGUIM",
          "nota": 7.4,
          "coroa": false,
          "img":"https://i.ibb.co/WWX681R/Tiguim.png",
          "pote":"2",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 7,
          "nome": "WEYDER",
          "nota": 7.2,
          "coroa": false,
          "img":"https://i.ibb.co/v4qzSFy/Weyder.png",
          "pote":"3",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 8,
          "nome": "ALMIR",
          "nota": 7.2,
          "coroa": false,
          "img":"https://i.ibb.co/ByXgCFG/Almir.png",
          "pote":"3",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 9,
          "nome": "MARCUS",
          "nota": 6.8,
          "coroa": false,
          "img":"https://i.ibb.co/BPXFBPw/Marcus.png",
          "pote":"3",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 10,
          "nome": "ALLESON",
          "nota": 7,
          "coroa": false,
          "img":"https://i.ibb.co/XW5FjZk/Alleson2.png",
          "pote":"4",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 11,
          "nome": "FELIPE",
          "nota": 6,
          "coroa": false,
          "img":"https://i.ibb.co/LgfvBTb/Felipe.png",
          "pote":"4",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 12,
          "nome": "AUGUSTO",
          "nota": 5.6,
          "coroa": false,
          "img":"https://i.ibb.co/6yD2mxq/Augusto.png",
          "pote":"4",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 13,
          "nome": "BEBE LEITE",
          "nota": 5.8,
          "coroa": true,
          "img":"https://i.ibb.co/XYgkTCC/bebe-leite.png",
          "pote":"5",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 14,
          "nome": "ZÉ RONILDO",
          "nota": 5,
          "coroa": true,
          "img":"https://i.ibb.co/L0rFFtL/z-ronildo.png",
          "pote":"5",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 15,
          "nome": "SEBASTIAO",
          "nota": 5.2,
          "coroa": true,
          "img":"https://i.ibb.co/yVjbPyT/Coroa.png",
          "pote":"5",
          "pontuacao":"➖",
          "gols":"0"
      }
    ]
    return mensalistas;
  }

  public buscarGoleiros(): JogadorDto[] {
    let goleiros: JogadorDto[] = [];
    goleiros = [
      {
          "id": 16,
          "nome": "RAMON",
          "nota": 9.0,
          "img":"https://i.ibb.co/dtB4XXN/Ramonzin.png",
          "pontuacao":"➖",
          "gols":"0"
      },
      {
          "id": 17,
          "nome": "MARCELO",
          "nota": 9.0,
          "img":"https://i.ibb.co/fVFfQw40/marcelo-sem-fundo.png",
          "pontuacao":"➖",
          "gols":"0"
      }
    ]
    return goleiros;
  }

  public buscarAvulsos(): JogadorDto[] {
    let jogadoresAvulsos: JogadorDto[] = [];
    jogadoresAvulsos = [
      {
        "id": 18,
        "nome": "ERICO",
        "nota": 9.0,
        "img":"https://i.ibb.co/wrNBrCgW/image.png",
        "pontuacao":"➖",
        "gols":"0"
      },
      {
        "id": 19,
        "nome": "LÉO XAVIER",
        "nota": 7.0,
        "img":"https://i.ibb.co/1BNbY0N/Leo-Xavier.png",
        "pontuacao":"➖",
        "gols":"0"
      },
      {
        "id": 20,
        "nome": "WANDERLEY",
        "nota": 8.0,
        "img":"https://i.ibb.co/bjcpWp8D/wanderley2.png",
        "pontuacao":"➖",
        "gols":"0"
      }
    ]

    return jogadoresAvulsos;
  }
}
