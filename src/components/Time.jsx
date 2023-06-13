import React, { useEffect, useState } from 'react';
import { getTime } from '../api';
import axios from "axios";

const Time = () => {
  const [time, setTime] = useState({});

  useEffect(() => {
    const fetchTime = async () => {
      const result = await getTime();
      setTime(result);
      console.log("update waktu")
    };

    fetchTime();

    const interval = setInterval(fetchTime, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='text-1xl'>Date: {time.day}-{time.month}-{time.year}</div>
      <div className='text-1xl'>Time: {time.time} (GMT +7)</div>
    </div>
  );
};

export default Time;
