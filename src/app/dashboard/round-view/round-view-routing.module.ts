import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteUtil } from "src/app/utils/route-util";
import { RoundViewComponent } from "src/app/dashboard/round-view/round-view.component";

const routes: Routes = RouteUtil.defaultRoute(RoundViewComponent);

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RoundViewRoutingModule {}
