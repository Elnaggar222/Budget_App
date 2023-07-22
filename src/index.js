import React from 'react';
import ReactDOM from 'react-dom/client';
import './Global.css';
import App from './App';
import {CategoriesProvider} from "services/context/budgetContext/CategoriesContext"
import {TransactionProvider} from "services/context/budgetContext/TransactionContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </TransactionProvider>
  </React.StrictMode>
);

