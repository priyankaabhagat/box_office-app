/* eslint-disable func-names */
import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line func-names

const LINKS = [
  { to: '/', item: 'HOME' },
  { to: '/starred', item: 'STARRED' },
];

const Navs = function () {
  return (
    <div>
      <ul>
        {LINKS.map(ele => (
          <li key="ele.to">
            <Link to={ele.to}>{ele.item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
