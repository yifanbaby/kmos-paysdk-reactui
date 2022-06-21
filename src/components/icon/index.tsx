import React, { FC } from 'react';
import type { CSSProperties } from 'react';

export interface IconProps {
  name: string;
  style?: CSSProperties;
  className?: string;
  icons:SVGAElement
}

const Icon: FC<IconProps> = ({ icons,name, style, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      style={style}
    >
      <use xlinkHref={`${icons}#${name}`} />
    </svg>
  );
};

export default Icon;
