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
import { JogarComponent } from './jogar/jogar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SorteioTimesComponent,
    MenuComponent,
    PontuacaoJogadoresComponent,
    GeracaoIndividualComponent,
    ArtilhariaComponent,
    JogarComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    DragDropModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
