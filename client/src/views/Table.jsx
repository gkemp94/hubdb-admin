import React, { useState } from 'react';
import Loading from '../components/Loading';
import { useParams } from 'react-router';
import './Table.scss';
import useFetch from '../hooks/useFetch';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import Search from '../components/Search';
import useFuse from '../hooks/useFuse';
import { NavLink } from 'react-router-dom';

export default () => {
  const { tableId } = useParams();
  const [query, setQuery] = useState("");
  const { data } = useFetch(`/api/tables/${tableId}/rows`);
  const rows = useFuse(data ? data.results : [], query);
  return data ? (
    <section className="hs-canvas">
      <header className="hs-canvas-header">
        <div>
          <h2 className="hs-canvas-title">
            {data.name}
          </h2>
          <div className="hs-canvas-subtitle">Updated <strong>2 days ago</strong> by <strong>George Kemp</strong></div>
        </div>
        <div>
          <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </header>
      <section className="hs-content-list">
        <ol className="hs-table">
          <li className="hs-table-row header">
            <div className="hs-table-cell">Name</div>
            <div className="hs-table-cell">Created</div>
          </li>
          {rows.map((x) => (
            <li key={x.id} className="hs-table-row">
              <NavLink to={`/tables/${tableId}/rows/${x.id}`}>
                <div className="hs-table-cell">{x.name}</div>
                <div className="hs-table-cell">{distanceInWordsToNow(
                  new Date(x.createdAt),
                  { addSuffix: true }
                )}</div>
              </NavLink>
              </li>
          ))}
        </ol>
    </section>
    </section >
  ) : null;
}
