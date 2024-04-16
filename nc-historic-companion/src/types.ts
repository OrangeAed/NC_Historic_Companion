export interface ComponentData {
    type: string;
    content: string;
}

export interface LocationData {
    title: string;
    description: string;
    components: [ComponentData];
    image: string;
    text: string;
    audio: string
}

export interface TourData {
    title: string;
    id: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
    audio: string
}