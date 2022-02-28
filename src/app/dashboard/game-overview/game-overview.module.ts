import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GameOverviewRoutingModule } from "./game-overview-routing.module";
import { GameOverviewComponent } from "./game-overview.component";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmationDialogModule } from "src/app/dashboard/dialogs/confirmation-dialog/confirmation-dialog.module";


@NgModule({
    declarations: [
        GameOverviewComponent
    ],
    imports: [
        CommonModule,
        GameOverviewRoutingModule,
        MatButtonModule,
        ConfirmationDialogModule
    ]
})
export class GameOverviewModule {}
