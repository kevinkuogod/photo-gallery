import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: loginPage,
  },
  /*錯在loginPage需要改tabPage
  {
    path: 'login',
    component: loginPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
      }
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class loginPageRoutingModule {}
