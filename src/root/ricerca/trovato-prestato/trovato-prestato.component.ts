import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { AutoriLibri } from '../../autori-libri';
import { BibliotecaService } from '../../biblioteca.service';

@Component({
  selector: 'app-trovato-prestato',
  templateUrl: './trovato-prestato.component.html',
  styleUrls: ['./trovato-prestato.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TrovatoPrestatoComponent implements OnInit {
  @Input() occorrenze: number = 0;
  @Input() trovato: AutoriLibri = new AutoriLibri("", "", "", "");
  @Output() eventoRestituzione = new EventEmitter<AutoriLibri>();

  libroDaRestituire: AutoriLibri = this.trovato;

  restituisciLibro() { // Funzionalità Restituzione
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
              ''
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

  constructor(private bs: BibliotecaService) { }

  ngOnInit() {
  }

}