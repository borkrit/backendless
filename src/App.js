import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom'; 
import tabs from './tabs.json';

const LoadPage = (file) => lazy(() => import(`./${file}`));

function App() {
  const [loadingPage, setLoadingPage] = useState(null);

  useEffect(() => {
    const location =  window.location.pathname
    let tabToOpen;  
    if (location !== '/') {
      tabToOpen = tabs.find((tab) => tab.id === location.replace('/',''));
    } else {
      tabToOpen = tabs[0];
    }
  
    if (tabToOpen) {
      handleLoad(tabToOpen.path);
    }
  }, []);



  const handleLoad = async (path) => {
    const LoadContentPage = await LoadPage(path);
    setLoadingPage(<LoadContentPage />);
  };

  return (
    <BrowserRouter> 
      <nav>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link to={`/${tab.id}`} onClick={() => handleLoad(tab.path)}>
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        {loadingPage}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
