"use client";

import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function LikeButton() {
  const [heart, setHeart] = useState<Boolean>(false);

  const handleHeartClick = () => {
    setHeart(!heart);
  };

  return (
    <Button variant="outline" onClick={handleHeartClick} className="px-2">
      <Heart fill={heart ? "red" : "white"} stroke={heart ? "red" : "black"} />
    </Button>
  );
}
