import { PlayerModel } from "src/app/shared/models/player-model";
import { TurnModel, TurnModelSaved } from "src/app/shared/models/turn-model";
import { CardColor } from "src/app/shared/models/card-color";
import { BidModel } from "src/app/shared/models/bid-model";

export type RoundModelSaved = {
    players: PlayerModel[];
    turns: TurnModelSaved[];
    startingPlayer: PlayerModel;
}

export class RoundModel {
    public players: PlayerModel[] = [];
    public turns: TurnModel[] = [];

    constructor(public startingPlayer: PlayerModel) {}

    public static deserialize(savedModel: RoundModelSaved): RoundModel {
        const ret = new RoundModel(savedModel.startingPlayer);
        ret.players = savedModel.players;
        ret.turns = savedModel.turns.map(value => TurnModel.deserialize(value));
        return ret;
    }

    public serialize(): RoundModelSaved {
        return {
            players: this.players,
            turns: this.turns.map(value => value.serialize()),
            startingPlayer: this.startingPlayer
        };
    }

    public fillTurns(): void {
        this.turns = [];
        const deckSize = 52; // 52 cards in a deck
        const initialGameCardAmount = Math.floor(deckSize / this.players.length);

        let cardAmount = initialGameCardAmount;
        let startingPlayerIndex = this.players.findIndex(value => value.id === this.startingPlayer.id);
        if (startingPlayerIndex === -1) {
            startingPlayerIndex = 0;
        }

        while (cardAmount > 0) {
            const trumpColor = this.createTrumpColor(this.turns.length);
            const turn = new TurnModel(this.players[startingPlayerIndex]);
            turn.cardAmount = cardAmount;
            turn.trumpColor = trumpColor;
            turn.bids = this.players.map(value => ({
                bidAmount: -1,
                actualAmount: -1,
                player: value
            }));
            this.turns.push(turn);

            cardAmount--;
            startingPlayerIndex = (startingPlayerIndex + 1) % this.players.length;
        }
    }

    public createTrumpColor(turnIndex: number): CardColor {
        turnIndex = turnIndex % 5;
        switch (turnIndex) {
            case 0:
                return CardColor.SPADES;
            case 1:
                return CardColor.HEARTS;
            case 2:
                return CardColor.CLUBS;
            case 3:
                return CardColor.DIAMONDS;
            case 4:
                return CardColor.NONE;
            default:
                throw new Error("should never happen");
        }
    }
}
