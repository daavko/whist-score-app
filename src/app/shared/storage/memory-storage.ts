export class MemoryStorage {

    private storageMap: Map<string, any> = new Map<string, any>();

    public hasValue(key: string): boolean {
        return this.storageMap.has(key);
    }

    public getValue<T>(key: string): T | null {
        return this.storageMap.get(key) as T;
    }

    public setValue<T>(key: string, value: T): void {
        this.storageMap.set(key, value);
    }

    public removeValue(key: string): void {
        this.storageMap.delete(key);
    }

    public clear(): void {
        this.storageMap.clear();
    }
}
