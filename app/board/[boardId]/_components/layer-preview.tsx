"use client"

import React, { memo } from "react";

import { useStorage } from "@/liveblocks.config";

import { LayerType } from "@/types/canvas";
import { Ellipse } from "./layers/ellipse";
import { Rectangle } from "./layers/rectangle";
import { Text } from "./layers/text";
import { Note } from "./layers/sticky-note";
import { Path } from "./layers/path";
import { colorToCss } from "@/lib/utils";

interface LayerPreviewProps {
  id: string;
  selectionColor?: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void; // fix
}

export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {

  const layer = useStorage((root) => root.layers.get(id))

  if (!layer) return null

  switch (layer.type) {
    
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={ (e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : '#000'}
          stroke={selectionColor}
        />
      )

    case LayerType.Text:
      return (
        <Text 
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )

    case LayerType.Note:
      return (
        <Note 
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )

    case LayerType.Ellipse:
      return (
        <Ellipse 
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )

    case LayerType.Rectangle:
      return (
        <Rectangle 
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )

    default: 
      //console.log('Unkown ')
      return null
  }

  return (
    <div>

    </div>
  )
});

LayerPreview.displayName = 'LayerPreview'