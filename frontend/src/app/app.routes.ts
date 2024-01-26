import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensacaoTermicaComponent } from './sensacao-termica/sensacao-termica.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather', component: SensacaoTermicaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }