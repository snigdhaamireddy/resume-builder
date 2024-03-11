import { useState, useEffect } from "react";
import "./usersPage.styles.css";
import UserModal from "./addUserModal/UserModal";
import { useParams } from "react-router-dom";
import axios from "axios";


function UsersPage() {
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/batches/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setBatchName(data[0].batchName);
      })
      .catch((error) => console.error("problem with fetch", error));
  }, []);

  const [users, setUsers] = useState([
    {
      name: "xyz",
      email: "xyz@gmail.com",
      phone: "83XXXXXXXX",
    },
    {
      name: "ayz",
      email: "xyz@gmail.com",
      phone: "83XXXXXXXX",
    },
    {
      name: "byz",
      email: "xyz@gmail.com",
      phone: "83XXXXXXXX",
    },
    {
      name: "cyz",
      email: "xyz@gmail.com",
      phone: "83XXXXXXXX",
    },
  ]);
  const [isEditing, setisEditing] = useState(-1);
  const [flag, setFlag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [batchName, setBatchName] = useState("");

  const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    

  async function toggleEdit(userIndex) {
    if (isEditing !== -1) {
      const updatedUser = { ...users[userIndex], ...editedUser };
      try {
        const response = await fetch(
          `http://localhost:8080/batches/${updatedUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
          }
        );

        if (!response.ok) {
          throw new Error("Network response error");
        }
        const newUsers = [...users];
        newUsers[userIndex] = updatedUser;
        setUsers(newUsers);
        setEditedUser({});
        setisEditing(-1);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setisEditing(userIndex);
    }
  }
  async function handleDelete(userIndex) {
    try {
      await fetch(`http://localhost:8080/batches/${userIndex}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err.message);
    }
    let newUsers = [...users];
    newUsers.splice(userIndex, 1);
    setUsers(newUsers);
  }
    function handleAddUser(user) {
    axios
      .post(`http://localhost:8080/batches/${params.id}`, user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
    setUsers([...users, user]);
  }
  if (flag)
    return (
      <>
        <div className="usersAndInfo">
          <button
            onClick={() => {
              setFlag((flag) => !flag);
            }}
          >
            Users
          </button>
          <button
            style={{
              backgroundColor: flag ? "#14744c" : "#3498db",
            }}
          >
            Info
          </button>
        </div>
        <p>Batch Name:{batchName}</p>
        <p>No of students:{users.length}</p>
      </>
    );
  else
    return (
      <>
        <div className="tabs">
          <div className="usersAndInfo">
            <button
              style={{
                backgroundColor: !flag ? "#14744c" : "#3498db",
              }}
            >
              Users
            </button>
            <button
              onClick={() => {
                setFlag((flag) => !flag);
              }}
            >
              Info
            </button>
          </div>
          <button id="addUserButton" onClick={openModal}>
            AddUser
          </button>
        </div>

        <UserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddUser={handleAddUser}
        />
        <div id="tableContainer">
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
            {users.map((user, index) => {
              return (
                <tr>
                  {index !== isEditing ? (
                    <td>{user.name}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="input"
                        defaultValue={user.name}
                        onChange={(event) =>
                          setEditedUser({
                            ...editedUser,
                            name: event.target.value,
                          })
                        }
                      />
                    </td>
                  )}
                  {index !== isEditing ? (
                    <td>{user.email}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        name="email"
                        className="input"
                        defaultValue={user.email}
                        onChange={(event) =>
                          setEditedUser({
                            ...editedUser,
                            email: event.target.value,
                          })
                        }
                      />
                    </td>
                  )}
                  {index !== isEditing ? (
                    <td>{user.phoneNumber}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        name="phoneNumber"
                        className="input"
                        defaultValue={user.phoneNumber}
                        onChange={(event) =>
                          setEditedUser({
                            ...editedUser,
                            phoneNumber: event.target.value,
                          })
                        }
                      />
                    </td>
                  )}

                  <td>
                    <button onClick={() => toggleEdit(index)} id="editButton">
                      {index !== isEditing ? "Edit" : "Save"}
                    </button>
                    <button
                      id="deleteButton"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button id="resumeButton">Resume</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </>
    );
}

export default UsersPage;
