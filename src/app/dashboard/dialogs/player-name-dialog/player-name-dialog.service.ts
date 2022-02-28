import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PlayerNameDialogComponent } from "src/app/dashboard/dialogs/player-name-dialog/player-name-dialog.component";
import { PlayerNameDialogModule } from "src/app/dashboard/dialogs/player-name-dialog/player-name-dialog.module";

@Injectable({
    providedIn: PlayerNameDialogModule
})
export class PlayerNameDialogService {

    constructor(private matDialog: MatDialog) { }

    public async editPlayerName(name: string): Promise<string> {
        const dialogRef = this.matDialog.open<PlayerNameDialogComponent, string, string>(PlayerNameDialogComponent, {
            minWidth: 640,
            data: name
        });
        return (await dialogRef.afterClosed().toPromise()) ?? name;
    }
}
