import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AniversariantesBackground implements OnDestroy {
  private intervalSubscription!: Subscription;

  constructor() {
    this.startBackgroundTask();
  }

  startBackgroundTask() {
    let dozeHorasEmMilissegundos = 43200000;
    this.intervalSubscription = interval(dozeHorasEmMilissegundos).subscribe(() => {
      this.executarFuncaoPeriodica();
    });
  }

  executarFuncaoPeriodica() {
    console.log('Em breve, novidades! ', new Date());
    // Coloque aqui a lógica que deseja executar.
  }

  ngOnDestroy() {
    // Cancela o subscribe para evitar memory leaks
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
