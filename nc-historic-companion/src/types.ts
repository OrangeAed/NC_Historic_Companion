export interface LocationData {
    title: string;
    description: string;
    image: string;
    text: string;
}

export interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
}