import { Injectable } from "@angular/core";
import { RoundModel } from "src/app/shared/models/round-model";
import { PlayerModel } from "src/app/shared/models/player-model";

@Injectable({
    providedIn: "root"
})
export class GameDataService {

    public rounds: RoundModel[] = [];
    public players: PlayerModel[] = [];
    public initialStartingPlayerId = -1;

    constructor() { }
}
