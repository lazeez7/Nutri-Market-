import React from 'react';
import { TbSearch } from 'react-icons/tb';
import './serach.css';

const Search = () => {
  return (
    <>
      <div className='search__wrap'>
        <div className='container'>
          <div className='search__input'>
            <div className='icon'>
              <TbSearch />
            </div>
            <input type='serach' placeholder='Поиск' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
