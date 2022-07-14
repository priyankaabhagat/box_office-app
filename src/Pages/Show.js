import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
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

  return <div>this is show page.</div>;
}

export default Show;
