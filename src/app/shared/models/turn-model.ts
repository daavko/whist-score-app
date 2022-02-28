import { CardColor } from "src/app/shared/models/card-color";
import { BidModel } from "src/app/shared/models/bid-model";
import { PlayerModel } from "src/app/shared/models/player-model";

export type TurnModelSaved = {
    trumpColor: CardColor;
    cardAmount: number;
    bids: BidModel[];
    dealer: PlayerModel;
}

export class TurnModel {
    public trumpColor: CardColor = CardColor.NONE;
    public cardAmount = -1;
    public bids: BidModel[] = [];

    constructor(public dealer: PlayerModel) {}

    public static deserialize(savedModel: TurnModelSaved): TurnModel {
        const ret = new TurnModel(savedModel.dealer);
        ret.trumpColor = savedModel.trumpColor;
        ret.cardAmount = savedModel.cardAmount;
        ret.bids = savedModel.bids;
        return ret;
    }

    public serialize(): TurnModelSaved {
        return {
            trumpColor: this.trumpColor,
            cardAmount: this.cardAmount,
            bids: this.bids,
            dealer: this.dealer
        };
    }

    public getPlayerScore(player: PlayerModel): number {
        const bid = this.bids.find(value => value.player.id === player.id);

        if (bid === undefined) {
            return -1;
        }

        if (bid.bidAmount === -1 || bid.actualAmount === -1) {
            return -1;
        }

        if (bid.bidAmount === bid.actualAmount) {
            return bid.bidAmount + 10;
        } else {
            return bid.actualAmount;
        }
    }
}
