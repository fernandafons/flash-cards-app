import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  cards: Observable<any>;

  constructor(
    private service: CardService
  ) { }

  ngOnInit() {
  }
  pesquisar() {
    console.log('log')
    this.cards = this.service.getAll();
    console.log('estou com isso aqui ', this.cards)
  }

}
