import { Routes } from '@angular/router';
import { NavigationComponentComponent } from './Components/navigation-component/navigation-component.component';
import { BPR1ComponentComponent } from './Components/bpr1-component/bpr1-component.component';
import { BPR2ComponentComponent } from './Components/bpr2-component/bpr2-component.component';
import { ORDSComponentComponent } from './Components/ords-component/ords-component.component';
import { ITEMComponentComponent } from './Components/item-component/item-component.component';
import { OTLTComponentComponent } from './Components/otlt-component/otlt-component.component';
import { WRHSComponentComponent } from './Components/wrhs-component/wrhs-component.component';

export const routes: Routes = [
    {path: '', redirectTo: '/Estoque' ,pathMatch: 'full'},
    {path: 'navigation', component: NavigationComponentComponent},
    {path: 'Cliente', component: BPR1ComponentComponent},
    {path: 'Fornecedor', component: BPR2ComponentComponent},
    {path: 'Venda', component: ORDSComponentComponent},
    {path: 'Item', component: ITEMComponentComponent},
    {path: 'Ponto-de-Venda', component: OTLTComponentComponent},
    {path: 'Estoque', component: WRHSComponentComponent}
];
