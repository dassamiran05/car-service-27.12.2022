import './App.css';
import {  RouterProvider } from 'react-router-dom';
import router from './Router/Routes/Routes';
import { Toaster } from 'react-hot-toast';


function App() {
  
  return (
    <div data-theme="secondary" className=' max-w-screen-xl mx-auto'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
    </div>
  );
}

export default App;
