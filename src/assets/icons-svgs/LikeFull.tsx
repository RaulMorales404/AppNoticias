import React from 'react';
import {SvgProps, Svg, Path} from 'react-native-svg';

interface SvgLikeFullProps extends SvgProps {
  secColor?: string; // Definir secColor como una propiedad adicional
}

function SvgLikeFull({secColor, ...props}: SvgLikeFullProps) {
  if (!props.width) {
    props.width = 24;
  }
  if (!props.height) {
    props.height = 24;
  }

  return (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={props.color || '#ffffff'}
        strokeWidth={2}
        strokeMiterlimit={10}
        d="m7.477 18.35 3.1 2.4c.4.4 1.3.6 1.9.6h3.8c1.2 0 2.5-.9 2.8-2.1l2.4-7.3c.5-1.4-.4-2.6-1.9-2.6h-4c-.6 0-1.1-.5-1-1.2l.5-3.2c.2-.9-.4-1.9-1.3-2.2-.8-.3-1.8.1-2.2.7l-4.1 6.1"
        fill={secColor || '#2ba8eb'} // Usar secColor para este Path
      />
      <Path
        stroke={props.color || '#ffffff'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.383 18.35v-9.8c0-1.4.6-1.9 2-1.9h1c1.4 0 2 .5 2 1.9v9.8c0 1.4-.6 1.9-2 1.9h-1c-1.4 0-2-.5-2-1.9"
        fill={secColor || '#2ba8eb'} // Color predeterminado
      />
    </Svg>
  );
}

export default React.memo(SvgLikeFull);
