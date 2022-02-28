import { Inject, Injectable } from "@angular/core";
import { Driver, NgForage } from "ngforage";
import { STORAGEUTILS_ENABLE_FALLBACK_STORAGE, STORAGEUTILS_STORAGE_NAME } from "./injection-tokens";
import { MemoryStorage } from "./memory-storage";

@Injectable({
    providedIn: "root"
})
export class StorageService {

    private readonly storageReady: Promise<void>;

    private fallbackStorage = new MemoryStorage();
    private usingFallbackStorage = false;

    constructor(private ngForage: NgForage,
                @Inject(STORAGEUTILS_STORAGE_NAME) storageName: string,
                @Inject(STORAGEUTILS_ENABLE_FALLBACK_STORAGE) private fallbackStorageEnabled: boolean) {
        this.ngForage.name = storageName;
        this.ngForage.driver = [ Driver.INDEXED_DB, Driver.LOCAL_STORAGE ];

        this.storageReady = this.checkUnderlyingStorage();
    }

    private async checkUnderlyingStorage(): Promise<void> {
        await this.ngForage.ready();
        if (this.ngForage.activeDriver === null) {
            // No active driver

            if (this.fallbackStorageEnabled) {
                this.usingFallbackStorage = true;
                console.warn("Using fallback storage for NgForage");
            } else {
                throw new Error("No valid NgForage driver running, fallback storage explicitly disabled.");
            }
        }
    }

    public async hasStoredItem(key: string): Promise<boolean> {
        await this.storageReady;
        if (this.usingFallbackStorage) {
            return this.fallbackStorage.hasValue(key);
        } else {
            return await this.ngForage.getItem(key) !== null;
        }
    }

    public async getStoredItem<T>(key: string): Promise<T | null> {
        await this.storageReady;
        if (this.usingFallbackStorage) {
            return this.fallbackStorage.hasValue(key) ? this.fallbackStorage.getValue<T>(key) : null;
        } else {
            return this.ngForage.getItem<T>(key);
        }
    }

    public async setStoredItem<T>(key: string, value: T): Promise<void> {
        await this.storageReady;
        if (this.usingFallbackStorage) {
            this.fallbackStorage.setValue<T>(key, value);
        } else {
            await this.ngForage.setItem<T>(key, value);
        }
    }

    public async removeStoredItem(key: string): Promise<void> {
        await this.storageReady;
        if (this.usingFallbackStorage) {
            this.fallbackStorage.removeValue(key);
        } else {
            await this.ngForage.removeItem(key);
        }
    }

    public async clearStorage(): Promise<void> {
        if (this.usingFallbackStorage) {
            this.fallbackStorage.clear();
        } else {
            await this.ngForage.clear();
        }
    }
}
