import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import MainPageLayout from '../components/MainPageLayout';

function Home() {
  const [input, setInput] = useState('');
  // console.log(input);

  function onInputChange(eventObj) {
    // console.log(event.target.value);
    setInput(eventObj.target.value);
  }

  function onSearch() {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  }

  function onKeyDown(event) {
    if (event.keyCode === 13) {
      // console.log(event.keyCode);
      onSearch();
    }
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
    </MainPageLayout>
  );
}

export default Home;
