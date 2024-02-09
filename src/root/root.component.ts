import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { BibliotecaService } from './biblioteca.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RicercaComponent,],
  providers: [BibliotecaService]
})
export class RootComponent implements OnInit {
  
  vediHome: boolean = true;
  vediRicerca: boolean = false;
  vediInserimento: boolean = false;
  vediEsciRicerca: boolean = false;
  vediEsciInserimento: boolean = false;

  mostraInserimento() {
    this.vediInserimento = true;
    this.vediEsciInserimento = true;
    this.vediHome = false;
  }

  mostraRicerca() {
    this.vediRicerca = true;
    this.vediEsciRicerca = true;
    this.vediHome = false;
  }

  tornaHomeInserimento() {
    this.vediInserimento = false;
    this.vediEsciInserimento = false;
    this.vediHome = true;
  }

  tornaHomeRicerca() {
    this.vediRicerca = false;
    this.vediEsciRicerca = false;
    this.vediHome = true;
  }

  constructor() { }

  ngOnInit() {
  }

}