import { colorToCss, getSvgPathFromStroke } from "@/lib/utils";
import { PathLayer } from "@/types/canvas";
import getStroke from 'perfect-freehand'

import React from "react";

interface PathProps {
  x: number,
  y: number,
  points: number[][],
  fill: string,
  onPointerDown?: (e: React.PointerEvent, id: string) => void,
  stroke?: string
}

export const Path = ({ x, y, onPointerDown, points, fill, stroke }: PathProps) => {

  return (
    <path 
      className="drop-shadow-md"
      //@ts-ignore
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 5,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  )

}