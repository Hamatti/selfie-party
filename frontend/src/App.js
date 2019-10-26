import React, { useState, useRef, useEffect } from "react";

import "./App.css";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  let [photos, setPhotos] = useState([]);

  useInterval(() => {
    // Your custom logic here
    fetch("http://localhost:5000/photos")
      .then(resp => resp.json())
      .then(data => {
        setPhotos(data);
      });
  }, 1000);
  return (
    <div className="App">
      {photos.map(photo => {
        return (
          <img
            key={photo.filename}
            src={`http://localhost:5000/photo/${photo.filename}`}
          />
        );
      })}
    </div>
  );
}

export default App;
