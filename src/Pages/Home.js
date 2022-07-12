import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import MainPageLayout from '../components/MainPageLayout';
// eslint-disable-next-line import/no-unresolved
import { apiGet } from '../misc/Config';

function Home() {
  const [input, setInput] = useState('');
  // console.log(input);
  const [results, setResult] = useState(null);

  function onInputChange(eventObj) {
    // console.log(event.target.value);
    setInput(eventObj.target.value);
  }

  function onSearch() {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResult(result);
      console.log(result);
    });
  }

  function onKeyDown(event) {
    if (event.keyCode === 13) {
      // console.log(event.keyCode);
      onSearch();
    }
  }

  function renderResults() {
    if (results && results.length === 0) {
      // this is when u type,unusual and api doesn't return anything.
      return <div>No Results Found.</div>;
    }

    if (results && results.length > 0) {
      // when something is returned.

      return (
        <div>
          {' '}
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    // default case when above two cases doesn't occur
    return null;
  }

  // return <div>GO TO HOME</div>;
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
