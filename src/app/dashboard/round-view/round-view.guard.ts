import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { GameDataService } from "src/app/shared/game-data/game-data.service";

@Injectable({
    providedIn: "root"
})
export class RoundViewGuard implements CanActivate {
    constructor(private gameData: GameDataService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.gameData.initialStartingPlayerId === -1) {
            return this.router.createUrlTree([ "/game-view" ]);
        } else {
            return true;
        }
    }

}
