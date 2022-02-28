import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MaterialIconRegistrator } from "src/app/shared/material-icon-registrator";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { STORAGEUTILS_ENABLE_FALLBACK_STORAGE, STORAGEUTILS_STORAGE_NAME } from "./shared/storage/injection-tokens";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: "cs"
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: "outline"
            } as MatFormFieldDefaultOptions
        },
        {
            provide: STORAGEUTILS_STORAGE_NAME,
            useValue: "ngx-whist-score-app"
        },
        {
            provide: STORAGEUTILS_ENABLE_FALLBACK_STORAGE,
            useValue: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        // Register used material design icons
        MaterialIconRegistrator.registerUsedIcons(matIconRegistry, domSanitizer);
    }
}
