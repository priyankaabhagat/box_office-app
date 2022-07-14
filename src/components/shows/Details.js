import React from 'react';

function Details({ status, premiered, network }) {
  return (
    <detailsWrapper>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>
        Premiered {premiered} {network ? `on ${network.name}` : null}
      </p>
    </detailsWrapper>
  );
}

export default Details;
