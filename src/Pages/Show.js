/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import { apiGet } from '../misc/Config';

function Show() {
  // eslint-disable-next-line consistent-return
  function reducer(prevState, action) {
    switch (action.type) {
      case 'FETCH_SUCCESS': {
        return { isLoading: false, error: null, show: action.show };
      }
      case 'FETCH_FAILED': {
        return { ...prevState, isLoading: false, error: action.error };
      }
      // eslint-disable-next-line no-unused-expressions
      default:
        return prevState;
    }
  }

  const { id } = useParams();

  const initialState = {
    show: null,
    isLoading: true,
    error: null,
  };

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast `)
      .then(results => {
        // if fetch is successful
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      // if fetch unsuccessful
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show : ', show);

  if (isLoading) {
    return <div>Data is being loaded.</div>;
  }
  if (error) {
    return <div>Error Occured : {error}</div>;
  }

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
}

export default Show;
