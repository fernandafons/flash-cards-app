import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Card } from '../models/cards.mode';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {
  cards: Observable<any>;
  listaCard: Array<Card>;
  card: Card;
  constructor(
    private toastCtrl: ToastController,
    private service: CardService
  ) {
    this.cards = this.service.getAll();


    this.cards.subscribe(cartoes =>
      this.listaCard = cartoes,
    );
  }

  ngOnInit() {
  }
  pesquisar() {
    console.log('log')

    console.log('estou com isso aqui ', this.listaCard)
  }



  sortear() {

    const random = Math.floor(Math.random() * this.listaCard.length);
    this.card = this.listaCard[random];
    console.log('teste do sortear ', this.card)

  }


  // async getCards() {
  //   this.cards = this.service.getAll();
  //   console.log('this.cards ',this.cards)
  // }
  // showToast(message: string) {
  //   this.toastCtrl.create({
  //     message: message,
  //     duration: 3000
  //   }).then(toastData => toastData.present());
  // }

}
