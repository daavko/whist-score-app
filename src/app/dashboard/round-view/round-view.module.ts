import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RoundViewRoutingModule } from "./round-view-routing.module";
import { RoundViewComponent } from "./round-view.component";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmationDialogModule } from "src/app/dashboard/dialogs/confirmation-dialog/confirmation-dialog.module";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";


@NgModule({
    declarations: [
        RoundViewComponent
    ],
    imports: [
        CommonModule,
        RoundViewRoutingModule,
        MatButtonModule,
        ConfirmationDialogModule,
        MatIconModule,
        MatInputModule
    ]
})
export class RoundViewModule {}
