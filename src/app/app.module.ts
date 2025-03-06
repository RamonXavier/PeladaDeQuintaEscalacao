import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SorteioTimesComponent } from './sorteioTimes/sorteioTimes.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { PontuacaoJogadoresComponent } from './pontuacaoJogadores/pontuacaoJogadores.component';
import { GeracaoIndividualComponent } from './geracaoIndividual/geracaoIndividual.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArtilhariaComponent } from './artilharia/artilharia.component';

@NgModule({
  declarations: [
    AppComponent,
    SorteioTimesComponent,
    MenuComponent,
    PontuacaoJogadoresComponent,
    GeracaoIndividualComponent,
    ArtilhariaComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
