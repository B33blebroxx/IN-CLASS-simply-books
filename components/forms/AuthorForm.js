import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createAuthor, updateAuthor } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  email: '',
  favorite: false,
  first_name: '',
  last_name: '',
  image: '',
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAuthor(patchPayload).then(() => {
          router.push('/author/view');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2
        className="text-white mt-5"
      >
        {obj.firebaseKey ? 'Update' : 'Create'} Author
      </h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Author First Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput1"
        label="Author Last Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput1"
        label="Author Email"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Email Address"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput1"
        label="Author Image"
        className="mb-3"
      >
        <Form.Control
          type="url"
          placeholder="Add Photo URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Form.Group
        className="mb-3"
        controlId="formBasicCheckbox"
      >
        <Form.Check
          type="switch"
          label="Favorite?"
          name="favorite"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />
      </Form.Group>
      <Button
        type="submit"
      >
        {obj.firebaseKey ? 'Update' : 'Create'} Author
      </Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};
export default AuthorForm;
