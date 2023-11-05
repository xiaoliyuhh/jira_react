import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool';
// 在jira-dev-tool后面引入antd覆盖devtool的默认antd样式
import 'antd/dist/antd.less'
import { AppProvider } from 'context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
loadServer(() => {
  root.render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <App />
      </AppProvider>

    </React.StrictMode>
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
