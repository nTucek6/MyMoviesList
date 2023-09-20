import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Footer from './navigation/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <App />
   <Footer />
  </>
   
);


/*
<React.StrictMode>
<App />
<Footer />
</React.StrictMode>
*/