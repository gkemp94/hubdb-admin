import { useState, useEffect } from 'react';


export default (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e);
      });
  }, [url]);
  return { data, loading, error };
};