import React from 'react';

import '../../utils/normalize.css';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <Main extact path="/" />
      </div>
      <Footer />
    </div >
  );
}

export default App;
