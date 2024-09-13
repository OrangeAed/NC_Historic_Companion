import {tourLocationData} from "./tourLocation.ts";

export interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, tourLocationData>;
    audio: string
}