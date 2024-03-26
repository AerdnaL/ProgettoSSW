import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AutoriLibri } from '../../autori-libri';
import { BibliotecaService } from '../../biblioteca.service';


@Component({
  selector: 'app-trovato-libero',
  templateUrl: './trovato-libero.component.html',
  styleUrls: ['./trovato-libero.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class TrovatoLiberoComponent implements OnInit {
  @Input() occorrenze: number = 0;
  @Input() trovato: AutoriLibri = new AutoriLibri("", "", "", "");
  @Input() vediRicercaLibero: boolean = false;

  inputPrestato: string = '';

  prestaLibro() { // Funzionalità Prestito
    this.bs.getData().pipe(
      switchMap((ajaxRes) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        const arrayNuovo = data.map((libroControllato: AutoriLibri) => {
          if(
            libroControllato.autore === this.trovato.autore &&
            libroControllato.titolo === this.trovato.titolo &&
            libroControllato.posizione === this.trovato.posizione
          ) {
            return new AutoriLibri (
              libroControllato.autore,
              libroControllato.titolo,
              libroControllato.posizione,
              this.inputPrestato
            );
          } else {
            return libroControllato;
          }
        });
        return this.bs.postData(arrayNuovo);
      })
    ).subscribe({
      next: () => {},
      error: (err) => 
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }

  rimuoviLibro() { // Funzionalità Rimozione
    this.bs.getData().pipe(
      switchMap((ajaxRes) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        const arrayNuovo = data.filter((libroControllato: AutoriLibri) => 
          libroControllato.autore !== this.trovato.autore &&
          libroControllato.titolo !== this.trovato.titolo &&
          libroControllato.posizione !== this.trovato.posizione
        );
        return this.bs.postData(arrayNuovo);
      })
    ).subscribe({
      next: () => {},
      error: (err) =>
        console.error('Observer got an error ' + JSON.stringify(err)),
    });
  }

  constructor(private bs: BibliotecaService) { }

  ngOnInit() {
  }

}