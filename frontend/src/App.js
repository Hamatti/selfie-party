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
  let [imageSize, setImageSize] = useState(18);

  useInterval(() => {
    // Your custom logic here
    fetch("http://localhost:5000/photos")
      .then(resp => resp.json())
      .then(data => {
        setPhotos(data);
      });
  }, 1000);
  return (
    <main className="App" style={{ "--image-size": `${imageSize}rem` }}>
      <details>
        <summary>
          <h1>Selfie Party 🎉</h1>
        </summary>
        <div className="Slider-Wrapper">
          <form>
            <label for="image-size">Image size</label>
            <input
              id="imageSize"
              name="imageSize"
              type="range"
              min="4"
              max="48"
              value={imageSize}
              onChange={ev => {
                setImageSize(ev.target.value);
              }}
            ></input>
            <output name="imageSizeOutput" id="imageSizeOutput">
              {imageSize}
            </output>
          </form>
        </div>
      </details>
      <div className="Gallery">
        {photos.map((photo, index) => {
          return (
            <img
              // TODO: Make this the filename once the images are unique
              key={index}
              alt={photo.description ? photo.description : ""}
              src={`http://localhost:5000/photo/${photo.filename}`}
            />
          );
        })}
      </div>
      <footer>
        <span className="ByFuturice">
          <span>by</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="120 180 1120 300"
            role="img"
            height="1em"
            focusable="false"
            aria-label="Futurice"
          >
            <path
              d="M133.3333 272.216c0-29.5253 18.3054-49.6053 51.9654-49.6053 15.0586 0 28.6413 4.4293 39.564 12.108l-15.3534 27.164c-5.02-4.1347-10.332-6.4974-18.3053-6.4974-12.6947 0-18.8987 7.9734-18.8987 21.2587v13.8787h45.176v32.772h-45.176V441.104h-38.972zM334.096 379.3933v-88.8706h38.9747v88.576c0 43.6986-22.1454 64.956-65.5467 64.956-43.4027 0-65.8427-21.2574-65.8427-64.956v-88.576h38.972v88.8706c0 23.0294 9.448 31.8894 26.8707 31.8894 17.4187 0 26.572-8.86 26.572-31.8894m77.3387-144.972h38.9746v56.1014h48.1267v32.772h-48.1267v66.728c0 16.2386 8.5627 21.26 19.7827 21.26 8.8573 0 13.8773-3.2494 20.0773-8.86l15.0587 27.756c-10.0387 7.676-23.916 13.876-41.9253 13.876-33.6614 0-51.968-19.7827-51.968-49.3067zm210.212 144.972v-88.8706h38.976v88.576c0 43.6986-22.1454 64.956-65.5494 64.956-43.4013 0-65.84-21.2574-65.84-64.956v-88.576h38.972v88.8706c0 23.0294 9.448 31.8894 26.868 31.8894 17.42 0 26.5734-8.86 26.5734-31.8894m171.5293-56.0986h-52.2614V441.104H701.94V290.5227h91.236zm46.9333-97.7307c13.2853 0 23.916 10.6293 23.916 23.9173 0 13.2867-10.6307 23.9147-23.916 23.9147-13.2867 0-23.916-10.628-23.916-23.9147 0-13.288 10.6293-23.9173 23.916-23.9173M859.3 441.104h-38.9747V290.5227H859.3zm109.532-153.5347c36.0213 0 55.804 15.3534 65.5466 46.6507l-36.0226 8.8587c-5.0187-15.0587-14.1707-22.7374-28.3427-22.7374-22.1453 0-33.3653 15.06-33.3653 45.4694 0 30.412 10.9253 45.472 33.3653 45.472 14.172 0 23.324-7.6774 28.3427-22.736l36.0226 8.8586c-9.7426 31.2974-29.5253 46.6494-65.5466 46.6494-45.4707 0-72.928-29.5254-72.928-78.244 0-48.716 27.4573-78.2414 72.928-78.2414m229.6893 118.3987c-13.284 23.324-33.656 38.0867-66.4307 38.0867-48.4226 0-73.5186-30.7054-73.5186-79.1294 0-48.1253 28.3426-77.356 71.4506-77.356 41.3374 0 69.9774 22.144 69.9774 70.272v17.7147h-101.8654c.8867 24.508 15.0574 36.9067 33.0707 36.9067 16.5347 0 29.2293-8.268 36.0213-22.44zm-36.6093-56.3947c0-15.3533-7.0867-31.0013-31.0027-31.0013-20.668 0-30.412 15.352-32.1827 31.0013h63.1854"
              fill="currentcolor"
            ></path>
          </svg>
        </span>
      </footer>
    </main>
  );
}

export default App;
