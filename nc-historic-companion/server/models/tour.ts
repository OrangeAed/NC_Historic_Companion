import {tourLocationData} from "./tourLocation.ts";

export interface TourData {
    id: string;
    title: string;
    description: string;
    image: string;
    locations: Record<string, tourLocationData>;
    audio: string
}