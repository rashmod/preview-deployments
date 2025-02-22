import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    fetch(`${API_URL}/hello`)
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetch(
      `${API_URL}/hello/${Math.floor(Math.random() * 10e16)
        .toString(16)
        .toUpperCase()}`,
    )
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetch(`${API_URL}/todos`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });

  return (
    <div className="App">
      <h1>Live Preview</h1>
    </div>
  );
}

export default App;
