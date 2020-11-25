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
    this.carregar_tela();
  }

  carregar_tela(){
    this.cards = this.service.getAll();
  }

  pesquisar() {
    console.log('log')
    console.log('estou com isso aqui ', this.cards)
  }

  delete(key: string) {
    this.service.delete(key);
    this.carregar_tela();
  }

}
