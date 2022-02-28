import { Injectable } from "@angular/core";
import { ConfirmationDialogModule } from "./confirmation-dialog.module";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

@Injectable({
    providedIn: ConfirmationDialogModule
})
export class ConfirmationDialogService {

    constructor(private dialog: MatDialog) {
    }

    public async confirm(): Promise<boolean> {
        const dialogRef = this.dialog.open<ConfirmationDialogComponent, undefined, boolean>(ConfirmationDialogComponent,
            {
                minWidth: 360,
                maxWidth: 480
            });
        return (await dialogRef.afterClosed().toPromise()) ?? false;
    }
}
