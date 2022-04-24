import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MessengerComponent} from "./messenger/messenger.component";

const routes: Routes = [{
  path: '',
  component: MessengerComponent,
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
