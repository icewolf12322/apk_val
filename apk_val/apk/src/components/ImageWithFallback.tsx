import { useState, type ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string
}

export function ImageWithFallback({ src, alt, fallback, style, ...rest }: Props) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        style={{
          backgroundColor: '#e8d49a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8b6030',
          fontFamily: "'Crimson Text', serif",
          fontSize: 13,
          fontStyle: 'italic',
          ...style,
        }}
      >
        {fallback || alt}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      onError={() => setError(true)}
      {...rest}
    />
  )
}
