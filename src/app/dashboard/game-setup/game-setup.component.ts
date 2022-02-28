import { Component, OnInit } from "@angular/core";
import { PlayerModel } from "src/app/shared/models/player-model";
import { PlayerNameDialogService } from "src/app/dashboard/dialogs/player-name-dialog/player-name-dialog.service";
import { GameDataService } from "src/app/shared/game-data/game-data.service";
import { Router } from "@angular/router";
import { StorageService } from "src/app/shared/storage/storage.service";
import { STORAGE_INITIAL_PLAYER, STORAGE_PLAYERS } from "src/app/shared/storage-keys";

@Component({
    selector: "app-game-setup",
    templateUrl: "./game-setup.component.html",
    styleUrls: [ "./game-setup.component.scss" ]
})
export class GameSetupComponent implements OnInit {

    public players: PlayerModel[] = [];
    public beginningPlayerId = -1;
    private idCounter = 1;

    constructor(private playerNameDialogService: PlayerNameDialogService,
                private gameData: GameDataService,
                private router: Router,
                private storageService: StorageService) { }

    public ngOnInit(): void {
    }

    public async addPlayer(): Promise<void> {
        const playerId = this.createPlayerId();
        const playerName = await this.playerNameDialogService.editPlayerName(`Player ${playerId}`);
        const player = {
            id: playerId,
            name: playerName
        };
        this.players.push(player);
    }

    public async editPlayerName(player: PlayerModel): Promise<void> {
        player.name = await this.playerNameDialogService.editPlayerName(player.name);
    }

    public removePlayer(player: PlayerModel): void {
        const index = this.players.findIndex(value => value.id === player.id);
        this.players.splice(index, 1);
        if (this.beginningPlayerId === player.id) {
            this.beginningPlayerId = -1;
        }
    }

    public movePlayerUp(player: PlayerModel): void {
        const index = this.players.findIndex(value => value.id === player.id);
        const tmp = this.players[index - 1];
        this.players[index - 1] = player;
        this.players[index] = tmp;
    }

    public movePlayerDown(player: PlayerModel): void {
        const index = this.players.findIndex(value => value.id === player.id);
        const tmp = this.players[index + 1];
        this.players[index + 1] = player;
        this.players[index] = tmp;
    }

    public markPlayerBeginning(player: PlayerModel): void {
        this.beginningPlayerId = player.id;
    }

    public async startGame(): Promise<void> {
        this.gameData.players = this.players;
        this.gameData.initialStartingPlayerId = this.beginningPlayerId;
        await this.storageService.setStoredItem(STORAGE_PLAYERS, this.gameData.players);
        await this.storageService.setStoredItem(STORAGE_INITIAL_PLAYER, this.gameData.initialStartingPlayerId);
        await this.router.navigate([ "/game-view" ]);
    }

    private createPlayerId(): number {
        const returnedId = this.idCounter;
        this.idCounter++;
        return returnedId;
    }

}
