/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});

  // Call Router Hook
  const router = useRouter();

  // Grab fbKey from url
  const { firebaseKey } = router.query;

  const getAuthDetails = () => {
    getAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  // // TODO: make call to API layer to get the data
  // useEffect(() => {
  //   viewBookDetails(firebaseKey).then(setBookDetails);
  // }, [firebaseKey]);

  useEffect(() => {
    getAuthDetails();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails?.first_name} {authorDetails?.last_name}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <p>{authorDetails.description || ''}</p>
      </div>
      <div id="auth-book-card">
        {authorDetails.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthDetails} />
        ))}
        ;
      </div>
    </div>
  );
}
