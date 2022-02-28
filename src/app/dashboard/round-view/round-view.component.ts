import { Component, OnInit } from "@angular/core";
import { GameDataService } from "src/app/shared/game-data/game-data.service";
import { Router } from "@angular/router";
import { ConfirmationDialogService } from "src/app/dashboard/dialogs/confirmation-dialog/confirmation-dialog.service";
import { RoundModel } from "src/app/shared/models/round-model";
import { PlayerModel } from "src/app/shared/models/player-model";
import { TurnPhase } from "src/app/shared/models/turn-phase";
import { CardColor } from "src/app/shared/models/card-color";
import { BidModel } from "src/app/shared/models/bid-model";
import { StorageService } from "src/app/shared/storage/storage.service";
import { STORAGE_SCORES } from "src/app/shared/storage-keys";

@Component({
    selector: "app-round-view",
    templateUrl: "./round-view.component.html",
    styleUrls: [ "./round-view.component.scss" ]
})
export class RoundViewComponent implements OnInit {
    // re-define for template
    public TurnPhase = TurnPhase;
    public CardColor = CardColor;

    public currentRound: RoundModel;

    public currentTurnIndex = 0;
    public currentTurnPhase = TurnPhase.BIDS;

    constructor(private gameData: GameDataService,
                private router: Router,
                private confirmationDialogService: ConfirmationDialogService,
                private storageService: StorageService) {
        let beginningPlayer: PlayerModel;
        if (gameData.rounds.length === 0) {
            const foundPlayer = this.gameData.players.find(value => value.id === this.gameData.initialStartingPlayerId);
            if (foundPlayer === undefined) { throw new Error("Couldn't find initial player"); }
            beginningPlayer = foundPlayer;
        } else {
            const lastRound = this.gameData.rounds[this.gameData.rounds.length - 1];
            const lastTurn = lastRound.turns[lastRound.turns.length - 1];
            const dealerIndex = this.gameData.players.findIndex(value => value.id === lastTurn.dealer.id);
            const newDealerIndex = (dealerIndex + 1) % this.gameData.players.length;
            beginningPlayer = this.gameData.players[newDealerIndex];
        }
        this.currentRound = new RoundModel(beginningPlayer);
        this.currentRound.players = this.gameData.players;
        this.currentRound.fillTurns();
    }

    ngOnInit(): void {
    }

    public async abandonRound(): Promise<void> {
        if (await this.confirmationDialogService.confirm()) {
            await this.router.navigate([ "/game-view" ]);
        }
    }

    public sumPlayerScores(player: PlayerModel): number {
        return this.currentRound.turns
                   .map(value => value.getPlayerScore(player))
                   .map(value => value === -1 ? 0 : value)
                   .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    }

    public unAdvanceTurnPhase(): void {
        switch (this.currentTurnPhase) {
            case TurnPhase.BIDS:
                this.currentTurnIndex--;
                this.currentTurnPhase = TurnPhase.SCORE;
                break;
            case TurnPhase.GAME:
                this.currentTurnPhase = TurnPhase.BIDS;
                break;
            case TurnPhase.SCORE:
                this.currentTurnPhase = TurnPhase.GAME;
                break;
        }
    }

    public advanceTurnPhase(): void {
        switch (this.currentTurnPhase) {
            case TurnPhase.BIDS:
                this.currentTurnPhase = TurnPhase.GAME;
                break;
            case TurnPhase.GAME:
                this.currentTurnPhase = TurnPhase.SCORE;
                break;
            case TurnPhase.SCORE:
                this.currentTurnIndex++;
                this.currentTurnPhase = TurnPhase.BIDS;
                break;
        }
    }

    public increaseBidAmount(bid: BidModel): void {
        bid.bidAmount++;
    }

    public decreaseBidAmount(bid: BidModel): void {
        bid.bidAmount--;
    }

    public increaseActualAmount(bid: BidModel): void {
        bid.actualAmount++;
    }

    public decreaseActualAmount(bid: BidModel): void {
        bid.actualAmount--;
    }

    public async finishGame(): Promise<void> {
        this.gameData.rounds.push(this.currentRound);
        await this.storageService.setStoredItem(STORAGE_SCORES, this.gameData.rounds.map(value => value.serialize()));
        await this.router.navigate([ "/game-view" ]);
    }

}
