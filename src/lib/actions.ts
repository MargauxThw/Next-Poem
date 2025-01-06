"use server"
import { Poem } from "./types";

// export const getRandomPoem = async (): Promise<Poem[]> => {
//     const data = await fetch("https://poetrydb.org/random");
//     const newPoemArray = data.json();
//     return newPoemArray;
// };

export const fetchNewRandomPoem = async (): Promise<Poem> => {
    const data = await fetch("https://poetrydb.org/random");
    const newPoemArray: Poem[] = await data.json();

    return newPoemArray[0];
};