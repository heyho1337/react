// src/components/common/ImgComp.tsx

import React from 'react';
import ImgCompProps from '@customTypes/ImgCompProps';
  
const ImgComp: React.FC<ImgCompProps> = ({ imageUrl, alt, title, width, height, ext }) => {
	return (
	  <picture>
		<source
		  type="image/webp"
		  srcSet={`${imageUrl}.webp`}
		/>
		<source
		  type="image/png"
		  srcSet={`${imageUrl}.${ext}`}
		/>
		<img
		  {...(width && { width })}
		  {...(height && { height })}
		  src={`${imageUrl}.${ext}`}
		  alt={alt}
		  title={title}
		/>
	  </picture>
	);
  };
  
  export default ImgComp;
  