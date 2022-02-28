import { TestBed } from "@angular/core/testing";

import { RoundViewGuard } from "./round-view.guard";

describe("RoundViewGuard", () => {
    let guard: RoundViewGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(RoundViewGuard);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });
});
