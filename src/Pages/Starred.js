import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/Config';
import ShowGrid from '../components/shows/ShowGrid';

function Starred() {
  // we will destructure the starred shows from useShows() hooks
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}?`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {/* these below lines are basically the conditons are defined. */}
      {isLoading && <div>Shows are still loading...</div>}{' '}
      {error && <div>Error Occurred : {error}</div>}{' '}
      {!isLoading && !shows && <div>No Shows were Added.</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
}

export default Starred;

// const Starred = () => {
//   return (
//     <div>Starred</div>
//   )
// }
