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

  useEffect(() => {
    getAuthDetails();
  }, []);

  return (
    <div>{authorDetails.books?.map((book) => (
      <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthDetails} />
    ))};
    </div>
  );
}
