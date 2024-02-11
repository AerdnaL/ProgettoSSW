import { Component, OnInit, Input } from '@angular/core';
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

  occorrenze: any = '';
  cercato: AutoriLibri = new AutoriLibri('', '', '', '');

  cercaLibro(event: KeyboardEvent) {
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        this.cercato = data.filter(
          (libro: any) =>
            libro.autore.toLowerCase().includes((event.target as HTMLInputElement).value) ||
            libro.titolo.toLowerCase().includes((event.target as HTMLInputElement).value)
        );
        this.occorrenze = Object.keys(this.cercato).length;
      },
    });
  }

  constructor(private bs: BibliotecaService) {}

  ngOnInit() {}
}
