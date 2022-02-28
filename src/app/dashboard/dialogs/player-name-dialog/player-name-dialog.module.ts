import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerNameDialogComponent } from "./player-name-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";


@NgModule({
    declarations: [
        PlayerNameDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class PlayerNameDialogModule {}
