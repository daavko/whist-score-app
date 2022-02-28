import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-player-name-dialog",
    templateUrl: "./player-name-dialog.component.html",
    styleUrls: [ "./player-name-dialog.component.scss" ]
})
export class PlayerNameDialogComponent implements OnInit {

    public nameForm = new FormGroup({
        playerName: new FormControl("", [ Validators.required ])
    });

    constructor(public dialogRef: MatDialogRef<PlayerNameDialogComponent, string>,
                @Inject(MAT_DIALOG_DATA) playerNameInput: string) {
        this.nameForm.controls.playerName.setValue(playerNameInput);
    }

    ngOnInit(): void {
    }

    public confirmName(): void {
        this.dialogRef.close(this.nameForm.controls.playerName.value as string);
    }

}
