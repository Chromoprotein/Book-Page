import React, { useState } from 'react';
import axios from 'axios';

export default function AddBook() {

    const initialState = { title: "", author: "", genre: "" };
    const [formState, setFormState] = useState(initialState);

    const formStateHandler = (e) => {
        setFormState((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }));
        console.log(formState.genre)
    }

    // Post request has withCredentials as a separate parameter
    // In this example, async-await instead of .then
    // Try-catch is used to handle errors
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_ADD_URI, formState, { withCredentials: true });

      if (response.status === 201) {
          console.log(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
            <form>
                <label for="title">Title</label>
                <input name="title" value={formState.title} onChange={formStateHandler} />

                <label for="author">Author</label>
                <input name="author" value={formState.author} onChange={formStateHandler} />

                <select onChange={formStateHandler} name="genre" value={formState.genre}>
                    <option value="" disabled>Genre</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="War">War</option>
                    <option value="Zombies">Zombies</option>
                    <option value="Crime">Crime</option>
                    <option value="Romance">Romance</option>
                    <option value="Nonfiction">Nonfiction</option>
                </select>

                <button type="submit" onClick={submitFormHandler}>Submit</button>
            </form>

        </div>
    );
};
