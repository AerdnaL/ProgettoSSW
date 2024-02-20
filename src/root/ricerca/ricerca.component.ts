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
            libro.autore.toLowerCase().includes((event.target as HTMLInputElement).value) ||
            libro.titolo.toLowerCase().includes((event.target as HTMLInputElement).value)
        );

        this.occorrenze = Object.keys(this.cercato).length;

        if(Object.keys(this.cercato).length == 1) {
          this.vediRicercaLibero = true;
          this.vediRicerca = false;
          this.trovato = this.cercato[0];
        }
      },
    });
  }

  prestaLibro(libroDaPrestare: AutoriLibri) { // Funzionalità Prestito
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        const arrayNuovo = data.map(
          (libroControllato: AutoriLibri) => {
            if(
              libroControllato.autore.includes(libroDaPrestare.autore) &&
              libroControllato.titolo.includes(libroDaPrestare.titolo) &&
              libroControllato.posizione.includes(libroDaPrestare.posizione)
            ) {
              return libroControllato = new AutoriLibri(libroControllato.autore, libroControllato.titolo, libroControllato.posizione, libroDaPrestare.prestito);
              } else {
                return libroControllato;
              }
          }
        );
        this.bs.postData(arrayNuovo).subscribe({
          next: (x:AjaxResponse<any>) => {},
        });
      }
    });
  }

  restituisciLibro(libroDaRestituire: AutoriLibri) { // Funzionalità Restituzione
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        const arrayNuovo = data.map(
          (libroControllato: AutoriLibri) => {
            if(
              libroControllato.autore === libroDaRestituire.autore &&
              libroControllato.titolo === libroDaRestituire.titolo &&
              libroControllato.posizione === libroDaRestituire.posizione 
            ) {
              return libroControllato = new AutoriLibri(libroControllato.autore, libroControllato.titolo, libroControllato.posizione, '');
              } else {
                return libroControllato;
            }
          }
        );
        this.bs.postData(arrayNuovo).subscribe({
          next: (x:AjaxResponse<any>) => {}
        });
      }
    });
  }

  rimuoviLibro(trovato: AutoriLibri) { // Funzionalità Rimozione
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        const arrayNuovo = data.filter(
          (libroDaRimuovere: AutoriLibri) => 
            !libroDaRimuovere.autore.includes(trovato.autore) &&
            !libroDaRimuovere.titolo.includes(trovato.titolo) &&
            !libroDaRimuovere.posizione.includes(trovato.posizione)
        );
        this.bs.postData(arrayNuovo).subscribe({
          next: (x: AjaxResponse<any>) => {},
        });
      }
    });
  }

  EmettiNascondiRicerca(valore: boolean) {
    this.eventoNascondiRicerca.emit(valore);
  }

  constructor(private bs: BibliotecaService) {}

  ngOnInit() {}
}
