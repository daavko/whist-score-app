import * as mdi from "@mdi/js";
// import * is used because we don't want tons of imports in here
// redundant icons that aren't used anywhere will be taken care of by the Angular optimizer and removed as dead code

export type UsedMaterialIcon = {
    name: string,
    path: string
};

// please take care that this is ordered alphabetically (with numbers at the top)
export const MATERIAL_ICON_REGISTRY: UsedMaterialIcon[] = [
    { name: "delete", path: mdi.mdiDelete },
    { name: "plus", path: mdi.mdiPlus },
    { name: "minus", path: mdi.mdiMinus },
    { name: "cards-club", path: mdi.mdiCardsClub },
    { name: "cards-diamond", path: mdi.mdiCardsDiamond },
    { name: "cards-heart", path: mdi.mdiCardsHeart },
    { name: "cards-spade", path: mdi.mdiCardsSpade },
    { name: "chevron-up", path: mdi.mdiChevronUp },
    { name: "chevron-down", path: mdi.mdiChevronDown },
    { name: "pencil", path: mdi.mdiPencil },
    { name: "star", path: mdi.mdiStar },
    { name: "star-outline", path: mdi.mdiStarOutline },
    { name: "cancel", path: mdi.mdiCancel },
    { name: "fullscreen", path: mdi.mdiFullscreen }
];
