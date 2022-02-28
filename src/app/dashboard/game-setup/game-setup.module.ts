import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GameSetupRoutingModule } from "./game-setup-routing.module";
import { GameSetupComponent } from "./game-setup.component";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { PlayerNameDialogModule } from "src/app/dashboard/dialogs/player-name-dialog/player-name-dialog.module";
import { MatTooltipModule } from "@angular/material/tooltip";


@NgModule({
    declarations: [
        GameSetupComponent
    ],
    imports: [
        CommonModule,
        GameSetupRoutingModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        PlayerNameDialogModule,
        MatTooltipModule
    ]
})
export class GameSetupModule {}
