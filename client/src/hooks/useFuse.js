import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
export default (data, q) => {
  const [fuse, setFuse] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    setFuse(new Fuse(data, { keys: ['label'] }))
  }, [data]);
  useEffect(() => {
    setItems(q ? fuse.search(q).map(({ item }) => item) : data);
  }, [fuse, q]);
  return items || [];
};