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
  imports: [CommonModule, InserimentoComponent, RicercaComponent],
  providers: [BibliotecaService],
})
export class RootComponent implements OnInit {
  vediRicerca?: boolean;
  vediInserimento?: boolean;
  vediHome?: boolean;

  mostraInserimento() {
    this.vediInserimento = true;
    this.vediRicerca = false;
  }

  nascondiInserimento(valore: boolean) {
    this.vediInserimento = valore;
  }

  mostraRicerca() {
    this.vediRicerca = true;
    this.vediInserimento = false;
  }

  nascondiRicerca(valore: boolean) {
    this.vediRicerca = valore;
  }

  constructor() {}

  ngOnInit() {}
}
