import React from 'react';
import { Card as StyledCard } from '../../styles/GlobalStyles';

function Card({ children, ...props }) {
  return <StyledCard {...props}>{children}</StyledCard>;
}

export default Card;
