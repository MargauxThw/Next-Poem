"use client";

import { Shuffle } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";

export default function RandomActionBar({
  newRandomPoem,
}: {
  newRandomPoem: () => void;
}) {
  return (
    <div className="flex gap-2">
      <LikeButton />
      <Button variant="outline" onClick={newRandomPoem}>
        New random poem
        <Shuffle />
      </Button>
    </div>
  );
}
