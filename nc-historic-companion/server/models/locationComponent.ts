export interface LocationComponentData {
    index: number;
    type: "text" | "image" | "audio";
    content: string;
    caption?: string;
}