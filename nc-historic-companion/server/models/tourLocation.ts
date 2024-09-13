import { LocationComponentData } from "./locationComponent.ts";

export interface TourLocationData {
    title: string;
    description: string;
    components: LocationComponentData[];
}