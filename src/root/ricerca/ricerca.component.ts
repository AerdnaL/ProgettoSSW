import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { TrovatoLiberoComponent } from './trovato-libero/trovato-libero.component'
import { TrovatoPrestatoComponent } from './trovato-prestato/trovato-prestato.component';
import { BibliotecaService } from '../biblioteca.service';
import { AutoriLibri } from '../autori-libri';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule, TrovatoLiberoComponent, TrovatoPrestatoComponent],
})
export class RicercaComponent implements OnInit {
  @Input() vediRicerca: boolean = false;
  @Input() vediRicercaLibero: boolean = false;
  @Input() occorrenze: number = 0;
  @Output() eventoNascondiRicerca = new EventEmitter<boolean>();

  cercato: AutoriLibri[] = [];
  trovato: AutoriLibri = new AutoriLibri("", "", "", "");

  cercaLibro(event: KeyboardEvent) { // Funzionalità Ricerca
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        this.cercato = data.filter(
          (libro: AutoriLibri) =>
            libro.autore && libro.autore.toLowerCase().includes((event.target as HTMLInputElement).value) ||
            libro.titolo && libro.titolo.toLowerCase().includes((event.target as HTMLInputElement).value)
        );
        this.occorrenze = Object.keys(this.cercato).length;
        if(Object.keys(this.cercato).length == 1) {
          this.vediRicercaLibero = true;
          this.vediRicerca = false;
          this.trovato = this.cercato[0];
        }
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }

  emettiNascondiRicerca(valore: boolean) {
    this.eventoNascondiRicerca.emit(valore);
  }

  constructor(private bs: BibliotecaService) {}

  ngOnInit() {}
}
