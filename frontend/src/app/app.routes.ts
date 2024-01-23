import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensacaoTermicaComponent } from './sensacao-termica/sensacao-termica.component';

export const routes: Routes = [
  { path: 'weather', component: SensacaoTermicaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }