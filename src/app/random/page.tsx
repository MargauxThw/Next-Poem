"use client";

import { fetchNewRandomPoem } from "@/lib/actions";
import PoemLayout from "@/components/poem-layout";
import RandomActionBar from "@/components/random-action-bar";
import { Poem } from "@/lib/types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [poem, setPoem] = useState<Poem>({
    title: "Loading...",
    author: "",
    lines: [],
  });

  const updatePoem = async () => {
    const newPoem = await fetchNewRandomPoem();
    setPoem(newPoem);
  };

  useEffect(() => {
    updatePoem();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-8 gap-4 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg">
        <PoemLayout child={poem} />
        <Separator />
        <RandomActionBar newRandomPoem={updatePoem} />
      </main>
    </div>
  );
}
