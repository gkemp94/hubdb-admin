import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: .75rem 1rem;
  border-radius: 5px;
  font-size: 1.4rem;
  border: 1px solid #e5eff5;
  min-width: 250px;
`;

export default ({ ...props }) => {
  return (
    <div>
      <Input type="text" {...props} placeholder="Search..." />
    </div>
  )
};