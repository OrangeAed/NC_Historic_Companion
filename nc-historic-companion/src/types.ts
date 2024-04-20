export interface ComponentData {
    type: string;
    content: string;
    caption?: string;
}

export interface LocationData {
    title: string;
    description: string;
    components: [ComponentData];
}

export interface TourData {
    title: string;
    id: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
    audio: string
}