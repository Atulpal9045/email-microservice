import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    toAddress: "",
    tenantId: "tenant1",
    userId: "user1",
    subject: "",
    body: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendEmail = async () => {
    try{
    await axios.post("http://localhost:4000/api/email/send", formData);
    alert("Email sent successfully!");
    }catch(error){
      console.log('error', error)
    }
  };

  return (
    <div className="container mt-4">
      <h2>Email Sender</h2>
      <input className="form-control mb-2" name="toAddress" placeholder="To Address" onChange={handleChange} />
      <input className="form-control mb-2" name="subject" placeholder="Subject" onChange={handleChange} />
      <textarea className="form-control mb-2" name="body" placeholder="Body" onChange={handleChange} />
      <button className="btn btn-primary" onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default App;
