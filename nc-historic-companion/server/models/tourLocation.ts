import { LocationComponent } from "./locationComponent.ts";

export interface tourLocationData {
    title: string;
    description: string;
    components: [LocationComponent];
}