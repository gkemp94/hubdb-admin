import React, { useState } from 'react';
import Loading from '../components/Loading';
import { useParams } from 'react-router';
import './Table.scss';
import useFetch from '../hooks/useFetch';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import Search from '../components/Search';
import useFuse from '../hooks/useFuse';
import keyBy from 'lodash/keyBy';
import Field from '../components/Field';
import { useEffect } from 'react';

export default () => {
  const { tableId, rowId } = useParams();
  
  const [query, setQuery] = useState("");
  console.log('test');
  const { data } = useFetch(`/api/tables/${tableId}/rows/${rowId}`);
  console.log('test1');
  console.log(data);
  const [values, setValues] = useState({});
  useEffect(() => {
    data && setValues({...data.values});
  }, [data]);
  const { data: tableData } = useFetch(`/api/tables/${tableId}`);
  let columns = tableData ? keyBy(tableData.columns, 'name') : {};
  const submit = () => {
    fetch(`/api/tables/${tableId}/rows/${rowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, values })
    }).then(res => {
      res.status === 200 && alert('Success');
    })
  }

  return data  && tableData && (
    <div>
      <table>
      {Object.keys(values).map(key => (
        <tr>
          <td>{key}</td>
          <td><Field type={columns[key].type} value={values[key]} onChange={(val) => {
            setValues({
              ...values,
              [key]: val,
            })
          }} /></td>
        </tr>
      ))}
      </table>
      <button onClick={submit} > Update </button>
    </div>
  )
  /*
  const rows = useFuse(data ? data.rows : [], query);
  console.log(rows);
  return data && data.rows ? (
    <section className="hs-canvas">
      <header className="hs-canvas-header">
        <div>
          <h2 className="hs-canvas-title">
            {data.meta.name}
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
            <li className="hs-table-row">
              <div className="hs-table-cell">{x.label}</div>
              <div className="hs-table-cell">{distanceInWordsToNow(
                new Date(x.createdAt),
                { addSuffix: true }
              )}</div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  ) : null;
  */
}
