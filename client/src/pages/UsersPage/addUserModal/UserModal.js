import React, { useState } from 'react';
import './addUserModal.styles.css';
import Papa from 'papaparse';

function UserModal({ isOpen, onClose, onAddUser }) {
 const [user, setUser] = useState({ name: '', email: '', phone: '' });
 const [users, setUsers] = useState([]);
 const [isCSVUpload, setIsCSVUpload] = useState(false); 
 const [csvFile, setCsvFile] = useState(null); 
 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
 };

 const handleSubmit = (event) => {
    event.preventDefault();
    onAddUser([user]);
    onClose();
 };

 const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
 };

 const handleCSVSubmit = () => {
    if (!csvFile) return;
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        onAddUser(results.data);
        setUsers(results.data);
      }
    });
    onClose(); 
 };

 if (!isOpen) return null;

 return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add User</h2>
        {!isCSVUpload ? (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={user.name} onChange={handleInputChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={user.email} onChange={handleInputChange} required />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={user.phone} onChange={handleInputChange} required />
            </label>
            <button type="submit" id='addButton'>Add</button>
            <button type="button" id='closeButton' onClick={onClose}>Cancel</button>
          </form>
        ) : ( 
          <div>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={handleCSVSubmit}>Submit</button>
            <button type="button" id='closeButton' onClick={onClose}>Cancel</button>
          </div>
        )}
        <button onClick={() => setIsCSVUpload(!isCSVUpload)}>
          {isCSVUpload ? 'Switch to Manual Input' : 'Upload CSV File'}
        </button>
      </div>
    </div>
 );
}

export default UserModal;