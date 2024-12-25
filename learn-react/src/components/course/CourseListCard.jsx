import { Fragment } from 'react';
import React from 'react';
import CourseItem from './CourseItem';
import Card from '../Card';

function CourseListCard({onIsFavorite, title, items}) {

  const lastIndex = items.length - 1;

  return (
    <Card title={title}>
      <div className="courses">
        {items.map((item, index) => (
          <Fragment key={item.id} >
            <CourseItem onIsFavorite={onIsFavorite} {...item} />
            {index  !== lastIndex && <hr className='divider' />}
          </Fragment>
          ))}
      </div>
    </Card>
  );
}

export default CourseListCard;