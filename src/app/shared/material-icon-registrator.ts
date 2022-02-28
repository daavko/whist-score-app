import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MATERIAL_ICON_REGISTRY } from "src/app/shared/material-icon-registry";

export class MaterialIconRegistrator {

    private static iconSvgFromPath(path: string): string {
        return `<svg viewBox="0 0 24 24"><path d="${path}" /></svg>`;
    }

    public static registerUsedIcons(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer): void {
        for (const icon of MATERIAL_ICON_REGISTRY) {
            matIconRegistry.addSvgIconLiteral(icon.name, domSanitizer.bypassSecurityTrustHtml(this.iconSvgFromPath(icon.path)));
        }
    }

}
