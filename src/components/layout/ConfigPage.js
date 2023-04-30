import React, { useState } from 'react';
import axios from 'axios';
import OwnerSidebar from '../owner/OwnerSidebar';

const ConfigPage = () => {
  const [formData, setFormData] = useState({
    grafana_adminuser: '',
    admin_password: '',
  });

  const { grafana_adminuser, admin_password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('/api/config', formData);
    // Assuming the response from the server contains the Grafana URL, you can redirect to it as follows
    window.location.href = res.data.grafanaUrl;
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "250px", height: "100vh", backgroundColor: "#f2f2f2" }}>
        <OwnerSidebar />
      </div>
      <form style={{ marginLeft: "80px", width: "100%", fontSize: "14px", padding: "20px" }} onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='grafana_adminuser'>Grafana Admin User</label>
          <input
            type='text'
            name='grafana_adminuser'
            value={grafana_adminuser}
            onChange={e => onChange(e)}
            style={{ width: "100%", padding: "10px", fontSize: "14px", marginBottom: "20px" }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='admin_password'>Admin Password</label>
          <input
            type='password'
            name='admin_password'
            value={admin_password}
            onChange={e => onChange(e)}
            style={{ width: "100%", padding: "10px", fontSize: "14px", marginBottom: "20px" }}
          />
        </div>
        <button type='submit' style={{ padding: "10px 20px", fontSize: "14px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>Save</button>
      </form>
    </div>
  );
};

export default ConfigPage;
