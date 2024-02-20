import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { BibliotecaService } from '../biblioteca.service';
import { AutoriLibri } from '../autori-libri';
import { FormsModule } from '@angular/forms';

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
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        let inserisciLibro: AutoriLibri = new AutoriLibri(
          this.inputAutore,
          this.inputTitolo,
          this.inputPosizione,
          ''
        );
        data.push(inserisciLibro);
        this.bs.postData(data).subscribe({
          next: (x: AjaxResponse<any>) => {},
        });

      }
    });
  }

  @Output() eventoNascondiInserimento = new EventEmitter<boolean>();

  EmettinascondiInserimento(valore: boolean) {
    this.eventoNascondiInserimento.emit(valore);
  }

  constructor(private bs: BibliotecaService) { }

  ngOnInit() {
  }

}