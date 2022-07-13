import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/Config';

function Show() {
  const id = useParams();
  console.log(id);

  const [show, setShow] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast `).then(results =>
      setShow(results)
    );
  }, [id]);

  console.log('show : ', show);

  return <div>this is show page.</div>;
}

export default Show;
