import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/hello")
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetch(
      `http://localhost:3000/hello/${Math.floor(Math.random() * 10e16)
        .toString(16)
        .toUpperCase()}`,
    )
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/todos")
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
