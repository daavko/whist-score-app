import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RoundViewGuard } from "src/app/dashboard/round-view/round-view.guard";

const routes: Routes = [
    {
        path: "game-setup",
        loadChildren: () => import("./dashboard/game-setup/game-setup.module").then(m => m.GameSetupModule)
    },
    {
        path: "game-view",
        loadChildren: () => import("./dashboard/game-overview/game-overview.module").then(m => m.GameOverviewModule)
    },
    {
        path: "round-view",
        canActivate: [ RoundViewGuard ],
        loadChildren: () => import("./dashboard/round-view/round-view.module").then(m => m.RoundViewModule)
    },
    {
        path: "**",
        redirectTo: "game-setup"
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
