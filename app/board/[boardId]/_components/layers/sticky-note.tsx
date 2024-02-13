import { Kalam } from "next/font/google";

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils'
import { useMutation } from '@/liveblocks.config'
import { NoteLayer } from "@/types/canvas";

const font = Kalam({
  subsets: ['latin'],
  weight: ['400']
})

interface NoteProps {
  id: string,
  layer: NoteLayer,
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
  const max = 50
  const scale = 0.3
  const fontSizeHeight = height * scale
  const fontSizeWidth = height * scale

  return Math.min(fontSizeHeight, fontSizeWidth, max)
}

export const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {

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
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        background: fill ? colorToCss(fill) : '#000'
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable 
        html={value || "Text"}
        onChange={handleChange}
        className={cn(
          'h-full w-full flex items-center justify-center text-center outline-none',
          font.className
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : '#000',
          fontSize: calculateFontSize(width, height)
        }}
      />
    </foreignObject>
  )

}