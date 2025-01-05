"use client";
import { Button } from "@/components/ui/button";
import { Shuffle, Heart } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Poem {
  title: string;
  author: string;
  lines: Array<string>;
}

const getRandomPoem = async (): Promise<Poem[]> => {
  return (await fetch("https://poetrydb.org/random")).json();
};

export default function Home() {
  const [poem, setPoem] = useState<Poem>({ title: "", author: "", lines: [] });
  const [heart, setHeart] = useState<Boolean>(false);

  useEffect(() => {
    fetchNewRandomPoem();
  }, [])

  const fetchNewRandomPoem = async () => {
    const newPoem: Poem[] = await getRandomPoem();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds smooth scrolling animation
    });
    setPoem(newPoem[0]);
  }

  const handleHeartClick = () => { setHeart(!heart); };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="decoration-black">{poem.title}</p>
        <p>{poem.author}</p>
        <p>
          {poem.lines.map((str, index) => (
            <React.Fragment key={index}>
              {str}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="flex gap-2">
        <Button variant="outline" onClick={handleHeartClick} className="px-2">
          <Heart fill={heart ? "red" : "white"} stroke={heart ? "red" : "black"}/>
        </Button>
        <Button variant="outline" onClick={fetchNewRandomPoem}>
          New random poem
          <Shuffle />
        </Button>
        </div>
      </main>
    </div>
  );
}
