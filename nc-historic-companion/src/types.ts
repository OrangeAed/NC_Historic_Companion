export interface LocationData {
    title: string;
    description: string;
    image: string;
}

export interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
}