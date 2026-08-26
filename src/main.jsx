import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router";

import './index.css'
import App from './routes/App.jsx'
import { store } from './store/store.js'
import FightPage from './routes/FightPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

        <HashRouter>
        
            <Routes>

                <Route path="*" element={<App />} />
                <Route path="/fight" element={<FightPage />} />


            </Routes>
        
        </HashRouter>
      
    </Provider>
  </StrictMode>
)
