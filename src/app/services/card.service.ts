import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private PATH = 'cards/';

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
      }));
  }

  delete() {
    const tutorialsRef = this.db.list(this.PATH);
    tutorialsRef.remove('key');
  }

  save(card: any) {
    console.log('salvando este dado ', card);
    return new Promise((resolve, reject) => {
      if (card.key) {
        this.db.list(this.PATH)
          .update(card.key, { targetLanguage: card.targetLanguage,
            motherLanguage: card.motherLanguage })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ targetLanguage: card.targetLanguage,
            motherLanguage: card.motherLanguage })
          .then(() => resolve());
      }
    })
  }
}
