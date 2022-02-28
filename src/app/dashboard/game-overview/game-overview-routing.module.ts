import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteUtil } from "src/app/utils/route-util";
import { GameOverviewComponent } from "src/app/dashboard/game-overview/game-overview.component";

const routes: Routes = RouteUtil.defaultRoute(GameOverviewComponent);

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class GameOverviewRoutingModule {}
