/* eslint-disable func-names */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled } from './Navs.styled';

// eslint-disable-next-line func-names

const LINKS = [
  { to: '/', text: 'HOME' },
  { to: '/starred', text: 'STARRED' },
];

const Navs = function () {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            <LinkStyled
              to={item.to}
              className={item.to === location.pathname ? 'active' : ''}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
