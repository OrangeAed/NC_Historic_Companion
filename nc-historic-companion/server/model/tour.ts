import { tourLocation } from './tourLocation';


export interface Tour {
    title: string;
    description: string;
    image: string;
    audio: string;
    tourLocations: tourLocation[];
}