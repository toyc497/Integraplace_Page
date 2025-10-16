import { Routes } from '@angular/router';
import { WarehouseComponent } from './Components/warehouse/warehouse.component';
import { ItemComponent } from './Components/item/item.component';
import { OpportunityComponent } from './Components/opportunity/opportunity.component';
import { OrderComponent } from './Components/order/order.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PartnerComponent } from './Components/partner/partner.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { ChatComponent } from './Components/chat/chat.component';
import { InfoPartnerComponent } from './Components/info-partner/info-partner.component';
import { InfoItemComponent } from './Components/info-item/info-item.component';
import { InfoVendasComponent } from './Components/info-vendas/info-vendas.component';

export const routes: Routes = [
    {path: 'warehouse', component: WarehouseComponent},
    {path: 'item', component: ItemComponent},
    {path: 'opportunity', component: OpportunityComponent},
    {path: 'order', component: OrderComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'partner', component: PartnerComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'info-partner', component: InfoPartnerComponent},
    {path: 'info-item', component: InfoItemComponent},
    {path: 'info-order', component: InfoVendasComponent}
];
