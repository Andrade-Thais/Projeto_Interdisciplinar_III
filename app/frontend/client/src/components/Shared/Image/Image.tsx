interface ImageProps {
  src: string;
  alt: string;
  className: string;
  width?: string;
  height?: string;
  srcSet?: string;
  sizes?: string;
}

export default function Image({src, alt, className, width, height, srcSet, sizes}: ImageProps) {
  return (
    <img
      loading="lazy"
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      decoding="async"
    />
  )
}