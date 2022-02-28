import { TestBed } from "@angular/core/testing";

import { PlayerNameDialogService } from "./player-name-dialog.service";

describe("PlayerNameDialogService", () => {
    let service: PlayerNameDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PlayerNameDialogService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
