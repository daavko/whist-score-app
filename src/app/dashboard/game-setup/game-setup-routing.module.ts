import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteUtil } from "src/app/utils/route-util";
import { GameSetupComponent } from "src/app/dashboard/game-setup/game-setup.component";

const routes: Routes = RouteUtil.defaultRoute(GameSetupComponent);

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class GameSetupRoutingModule {}
