import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {
  cards: Observable<any>;

  constructor(
    private toastCtrl: ToastController,
    private service: CardService
  ) { }

  ngOnInit() {
  }
  pesquisar() {
    console.log('log')
    this.cards = this.service.getAll();
    console.log('estou com isso aqui ', this.cards)
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
