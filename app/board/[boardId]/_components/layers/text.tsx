import { Kalam } from "next/font/google";

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { cn, colorToCss } from '@/lib/utils'
import { useMutation } from '@/liveblocks.config'
import { TextLayer } from "@/types/canvas";

const font = Kalam({
  subsets: ['latin'],
  weight: ['400']
})

interface TextProps {
  id: string,
  layer: TextLayer,
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
  const max = 96
  const scale = 0.5
  const fontSizeHeight = height * scale
  const fontSizeWidth = height * scale

  return Math.min(fontSizeHeight, fontSizeWidth, max)
}

export const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {

  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers')
    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={ (e) => onPointerDown(e, id) }
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none'
      }}
    >
      <ContentEditable 
        html={value || "Text"}
        onChange={handleChange}
        className={cn(
          'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : '#000',
          fontSize: calculateFontSize(width, height)
        }}
      />
    </foreignObject>
  )

}