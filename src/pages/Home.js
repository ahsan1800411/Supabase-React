import supabase from '../config/Supabase';
import { useState, useEffect } from 'react';
import Smoothie from '../components/Smoothie';

const Home = () => {
  const [error, setError] = useState('');
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at')



  async function getSmoothies() {
    const { data, error } = await supabase.from('smoothies').select().order(orderBy, { ascending: false });
    if (error) {
      setError("Couldn't find smoothies");
      return;
    }
    setSmoothies(data);
  }

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }
  useEffect(() => {
    getSmoothies();
  }, [orderBy]);

  console.log(error)

  return (
    <div className='page home'>
      <div className='smoothies'>
        <div className="order-by">
          <p>Order by:</p>
          <button onClick={() => setOrderBy('created_at')}>Time Created</button>
          <button onClick={() => setOrderBy('title')}>Title</button>
          <button onClick={() => setOrderBy('rating')}>Rating</button>
        </div>
        {/* Error by Buttons */}
        <div className='smoothie-grid'>
          {smoothies?.map((smoothie) => (
            <Smoothie key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
