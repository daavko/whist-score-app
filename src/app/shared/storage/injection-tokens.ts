import { InjectionToken } from "@angular/core";

export const STORAGEUTILS_STORAGE_NAME = new InjectionToken<string>("Storage name");
export const STORAGEUTILS_ENABLE_FALLBACK_STORAGE = new InjectionToken<boolean>(
    "Whether fallback memory storage is enabled");
