import { MemoryStorage } from "./memory-storage";

describe("MemoryStorage", () => {
    it("should create an instance", () => {
        expect(new MemoryStorage()).toBeTruthy();
    });
});
