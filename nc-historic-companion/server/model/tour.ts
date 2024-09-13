import { Location } from './location';


export interface Tour {
    title: string;
    description: string;
    image: string;
    audio: string;
    locations: Location[];
}