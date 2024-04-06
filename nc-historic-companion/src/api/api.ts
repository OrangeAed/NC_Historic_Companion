import { readFile, writeFile } from 'fs/promises';

export const getAllTours = async () => {
    const data = await readFile('public/data/tours.json', 'utf-8');
    return JSON.parse(data);
};

export const addTour = async (tourData: any) => {
    const data = await readFile('public/data/tours.json', 'utf-8');
    const tours = JSON.parse(data);
    tours.tours[tourData.id] = tourData;
    await writeFile('public/data/tours.json', JSON.stringify(tours), 'utf-8');
    return tourData;
};

export const getTour = async (id: string) => {
    const data = await readFile('public/data/tours.json', 'utf-8');
    const tours = JSON.parse(data);
    return tours.tours[id];
};

export const deleteTour = async (id: string) => {
    const data = await readFile('public/data/tours.json', 'utf-8');
    const tours = JSON.parse(data);
    delete tours.tours[id];
    await writeFile('public/data/tours.json', JSON.stringify(tours), 'utf-8');
    return { message: `Tour with id ${id} deleted` };
};