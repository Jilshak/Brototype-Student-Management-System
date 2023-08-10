import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet} from 'react-router-dom'


function HomePage() {


  return (

    <div className='bg-black h-screen w-screen'>
      <div class="grid grid-cols-12 gap-4 bg-black h-screen w-screen">

        <div class="col-span-2">
          <Sidebar />
        </div>

        <div class="col-span-10 text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
