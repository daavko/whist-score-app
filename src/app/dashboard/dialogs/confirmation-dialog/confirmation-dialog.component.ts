import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-confirmation-dialog",
    templateUrl: "./confirmation-dialog.component.html",
    styleUrls: [ "./confirmation-dialog.component.scss" ]
})
export class ConfirmationDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>) {
    }

    public ngOnInit(): void {
    }

    public cancel(): void {
        this.dialogRef.close(false);
    }

    public confirm(): void {
        this.dialogRef.close(true);
    }

}
