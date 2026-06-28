import React, { useState } from 'react';

const PincodeChecker = () => {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');

  const checkDelivery = () => {
    if (pin.length === 6 && !isNaN(pin)) {
      setStatus('⚡ Delivery available within 2-3 Days!');
    } else {
      setStatus('❌ Invalid Pincode entry.');
    }
  };

  return (
    <div style={{ margin: '15px 0', padding: '10px', background: '#f9f9f9', border: '1px solid #ddd', maxWidth: '300px' }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666' }}>Check Delivery Pincode:</label>
      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
        <input type="text" maxLength="6" placeholder="Enter 6-digit PIN" value={pin} onChange={e => setPin(e.target.value)} style={{ padding: '4px', width: '120px' }} />
        <button onClick={checkDelivery} style={{ background: '#2874f0', color: 'white', border: 'none', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>Check</button>
      </div>
      {status && <p style={{ fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
};

export default PincodeChecker;