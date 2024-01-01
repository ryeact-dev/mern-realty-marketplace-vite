import { useEffect, useState } from 'react';

export default function Image({ src, ...rest }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    let objectUrl;

    if (src.toString().includes('https://' || 'http://')) {
      setImgSrc(src);
    } else {
      objectUrl = URL.createObjectURL(src);
      setImgSrc(objectUrl);
    }

    // Revoke the object URL after the image has finished loading
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return <img {...rest} src={imgSrc} alt={''} loading='lazy' />;
}
