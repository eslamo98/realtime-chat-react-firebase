import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import ChatContextProvider from './store/ChatContext';
import MenuProvider from './store/MenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Store>
        <ChatContextProvider>
            <MenuProvider>
                <App />
            </MenuProvider>
        </ChatContextProvider>
    </Store>
);