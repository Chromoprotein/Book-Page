import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get('https://node-practice-2-463982825488.herokuapp.com')
    .then(res => {
      console.log(res.data.data)
      setPost(res.data.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {post.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default App;
