import React from 'react';
import logo from '../logo.svg'; // Importation du logo à partir du chemin spécifié


class Welcome extends React.Component {
  render() {
    return (
      <div className="Welcome">
        <img src={logo} className="Welcome-logo" alt="logo" />
        <p>
           Hello World <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="Welcome-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  }
}

export default Welcome;
