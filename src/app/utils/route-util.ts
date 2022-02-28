import { Type } from "@angular/core";
import { Routes } from "@angular/router";

export class RouteUtil {
    public static defaultRoute(component: Type<any>): Routes {
        return [
            {
                path: "",
                component
            }
        ];
    }
}
