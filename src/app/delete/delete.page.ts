import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from '../services/card.service';
import { ModalController } from '@ionic/angular';
import { ModalConfirmPage } from '../modais/modal-confirm/modal-confirm.page';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  cards: Observable<any>;

  constructor(
    private service: CardService,
    private modalcontroller: ModalController
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

  async delete(key: string) {
    const modal = await this.modalcontroller.create({
      component: ModalConfirmPage,
      componentProps: {'key': key}
    })
    modal.present();
    console.log(key)
    // this.service.delete(key);
    this.carregar_tela();
  }

}
