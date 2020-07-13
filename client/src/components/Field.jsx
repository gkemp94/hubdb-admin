import React from 'react';

const Text = ({ value, onChange = () => {} }) => {
  const _onChange = (e => onChange(e.target.value));
  return (
    <input type="text" value={value} onChange={_onChange} />
  );
}

const Number = ({ value, onChange = () => {} }) => {
  const _onChange = (e => onChange(e.target.value));
  return (
    <input type="number" value={value} onChange={_onChange} />
  );
};

const Boolean = ({ value, onChange = () => {} }) => {
  const _onChange = (e => onChange(e.target.checked ? 1 : 0));
  const _value = !!value;
  return (
    <input type="checkbox" checked={_value} onChange={_onChange} />
  );
};

const Image = ({ value, onChange = () => {} }) => {
    const _onChange = (e => onChange({ url : e.target.value, ...value}));
    const _value = value.url;
    return (
      <input type="text" value={_value} onChange={_onChange} />
    );
  }

export default ({ type, ...props }) => {
  console.log(props);
  switch(type) {
    case 'TEXT':
      return <Text {...props} />;
    case 'NUMBER':
      return <Number {...props} />;
    case 'URL':
      return <Text {...props} />;
    case 'BOOLEAN':
      return <Boolean {...props} />;
    case 'IMAGE':
  return <Image {...props} />
    default:
      console.log(type);
      return <div>Not Implemented type {type}</div>;
  }
}
