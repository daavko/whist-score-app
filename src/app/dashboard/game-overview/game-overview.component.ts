import { Component, OnInit } from "@angular/core";
import { GameDataService } from "src/app/shared/game-data/game-data.service";
import { PlayerModel } from "src/app/shared/models/player-model";
import { RoundModel, RoundModelSaved } from "src/app/shared/models/round-model";
import { StorageService } from "src/app/shared/storage/storage.service";
import { STORAGE_INITIAL_PLAYER, STORAGE_PLAYERS, STORAGE_SCORES } from "src/app/shared/storage-keys";
import { Router } from "@angular/router";
import { ConfirmationDialogService } from "src/app/dashboard/dialogs/confirmation-dialog/confirmation-dialog.service";

@Component({
    selector: "app-game-overview",
    templateUrl: "./game-overview.component.html",
    styleUrls: [ "./game-overview.component.scss" ]
})
export class GameOverviewComponent implements OnInit {

    public players: PlayerModel[];
    public rounds: RoundModel[];

    constructor(private gameData: GameDataService,
                private storageService: StorageService,
                private router: Router,
                private confirmationDialogService: ConfirmationDialogService) {
        this.players = gameData.players;
        this.rounds = gameData.rounds;
    }

    public async ngOnInit(): Promise<void> {
        if (this.gameData.players.length === 0 && await this.storageService.hasStoredItem(STORAGE_PLAYERS)) {
            this.gameData.players = await this.storageService.getStoredItem(STORAGE_PLAYERS) ?? [];
            this.players = this.gameData.players;
        }
        if (this.gameData.initialStartingPlayerId === -1 && await this.storageService.hasStoredItem(
            STORAGE_INITIAL_PLAYER)) {
            this.gameData.initialStartingPlayerId = await this.storageService.getStoredItem(STORAGE_INITIAL_PLAYER) ?? 0;
            this.players = this.gameData.players;
        }
        if (this.gameData.rounds.length === 0 && await this.storageService.hasStoredItem(STORAGE_SCORES)) {
            this.gameData.rounds = (await this.storageService.getStoredItem<RoundModelSaved[]>(STORAGE_SCORES))?.map(
                value => RoundModel.deserialize(value)) ?? [];
            this.rounds = this.gameData.rounds;
        }
    }

    public async abandonGame(): Promise<void> {
        if (await this.confirmationDialogService.confirm()) {
            this.gameData.players = [];
            this.gameData.rounds = [];
            this.gameData.initialStartingPlayerId = -1;
            await this.storageService.clearStorage();
            await this.router.navigate([ "/" ]);
        }
    }

    public async startNewRound(): Promise<void> {
        if (await this.confirmationDialogService.confirm()) {
            await this.router.navigate([ "/round-view" ]);
        }
    }

    public sumPlayerScores(player: PlayerModel): number {
        return this.rounds
                   .map(round => {
                       return round.turns
                                   .map(value => value.getPlayerScore(player))
                                   .map(value => value === -1 ? 0 : value)
                                   .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
                   })
                   .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    }

    public sumPlayerScoreInRound(player: PlayerModel, round: RoundModel): number {
        return round.turns
                    .map(value => value.getPlayerScore(player))
                    .map(value => value === -1 ? 0 : value)
                    .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    }

}
