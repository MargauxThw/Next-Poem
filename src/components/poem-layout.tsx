"use client";

import { Poem } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

export default function PoemLayout({ child }: { child: Poem }) {
  const [poem, setPoem] = useState<Poem>(child);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPoem(child);
  }, [child]);

  return (
    <>
      <div className="flex flex-col items-start sm:items-start gap-4">
        <h2 className="decoration-black font-bold text-xl">{poem.title}</h2>
        <h3 className="italic text-lg">{poem.author}</h3>
      </div>

      <Separator />

      <p>
        {poem.lines.map((str, index) => (
          <React.Fragment key={index}>
            {str}
            <br />
          </React.Fragment>
        ))}
      </p>
    </>
  );
}
