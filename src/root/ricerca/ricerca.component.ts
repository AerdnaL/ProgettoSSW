import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { TrovatoLiberoComponent } from './trovato-libero/trovato-libero.component'
import { BibliotecaService } from '../biblioteca.service';
import { AutoriLibri } from '../autori-libri';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule, TrovatoLiberoComponent],
})
export class RicercaComponent implements OnInit {
  @Input() vediRicerca: boolean = false;
  @Input() vediRicercaLibero: boolean = false;
  @Input() occorrenze: number = 0;

  cercato: AutoriLibri[] = [];
  trovato: AutoriLibri = new AutoriLibri("", "", "", "");

  cercaLibro(event: KeyboardEvent) {
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

  @Output() eventoNascondiRicerca = new EventEmitter<boolean>();

  EmettiNascondiRicerca(valore: boolean) {
    this.eventoNascondiRicerca.emit(valore);
  }

  prestaLibro(libroDaPrestare: AutoriLibri) {
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
              return {...libroControllato, prestito: libroDaPrestare.prestito};
              } else {
                return libroControllato;
              }
          }
        );
        console.log(arrayNuovo);
      }
    });
  }

  rimuoviLibro(trovato: AutoriLibri) {
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


  constructor(private bs: BibliotecaService) {}

  ngOnInit() {}
}
