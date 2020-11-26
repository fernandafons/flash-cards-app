import { Component, OnInit, Input } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.page.html',
  styleUrls: ['./modal-confirm.page.scss'],
})
export class ModalConfirmPage implements OnInit {
  @Input() key: string;
  
  constructor(
    private service: CardService,
    public navCtrl: NavController,
    private modalcontroller: ModalController
  ) { }

  ngOnInit() {
  }

  delete() {
    // const modal = await this.modalcontroller.create({
    //   component: ModalConfirmPage
    // })
    // modal.present();
    console.log(this.key)
    this.service.delete(this.key);
    this.modalcontroller.dismiss();
  }
}
