import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { BibliotecaService } from '../biblioteca.service';
import { AutoriLibri } from '../autori-libri';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class InserimentoComponent implements OnInit {

  inputTitolo: string = '';
  inputAutore: string = '';
  inputPosizione: string = '';

  carica() {
    this.bs.getData().pipe(
      switchMap((ajaxRes) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        let libroNuovo: AutoriLibri = new AutoriLibri(
          this.inputAutore,
          this.inputTitolo,
          this.inputPosizione,
          ''
        );
        data.push(libroNuovo);
        return this.bs.postData(data);
      })
    ).subscribe({
      next: () => {},
      error: (err) =>
        console.error('Observer carica got an error ' + err),
    });
  }

  @Output() eventoNascondiInserimento = new EventEmitter<boolean>();

  emettiNascondiInserimento(valore: boolean) {
    this.eventoNascondiInserimento.emit(valore);
  }

  constructor(private bs: BibliotecaService) { }

  ngOnInit() {
  }

}