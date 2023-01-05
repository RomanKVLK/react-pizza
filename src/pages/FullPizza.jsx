import React from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
  const { id } = useParams();

  React.useEffect(() => {}, []);

  return (
    <div className="container">
      <img src="" />
      <h2>222</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo deleniti ullam consequatur
        libero eius delectus magni molestias eligendi aliquid, eos impedit incidunt! Nesciunt
        repudiandae eius quia, quibusdam beatae aut expedita!
      </p>
      <h4>250 p</h4>
    </div>
  );
};

export default FullPizza;
