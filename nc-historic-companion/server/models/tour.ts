import {TourLocationData} from "./tourLocation.ts";

export interface TourData {
    id: string;
    title: string;
    description: string;
    image: string;
    locations: Record<string, TourLocationData>;
    audio: string
}

export interface TourObject {
    id: string;
    title: string;
    description: string;
    image?: File;
    audio?: File
    locations: Record<string, TourLocationData>;
}