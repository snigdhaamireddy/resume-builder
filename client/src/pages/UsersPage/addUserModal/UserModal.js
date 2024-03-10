import React, { useState } from 'react';
import './addUserModal.styles.css';

function UserModal({ isOpen, onClose, onAddUser }) {
 const [user, setUser] = useState({ name: '', email: '', phoneNumber:'' });

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
 };

 const handleSubmit = (event) => {
    event.preventDefault();
    onAddUser(user);
    onClose();
 };

 if (!isOpen) return null;

 return (
    <div className="modal">
      <div className="modal-content">
        <h2 >Add User</h2>
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
            <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleInputChange} required />
          </label>
          <button type="submit" id='addButton'>Add</button>
          <button type="button" id='closeButton' onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
 );
}

export default UserModal;
