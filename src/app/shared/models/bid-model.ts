import { PlayerModel } from "src/app/shared/models/player-model";

export type BidModel = {
    bidAmount: number;
    actualAmount: number;
    player: PlayerModel;
}
