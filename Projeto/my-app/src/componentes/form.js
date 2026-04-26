import { useState } from "react";

export default function Form() {
    const [newUser, setNewUser] = useState('');
    const [users, setUsers] = useState([
        {id: 0, name: "John"},
        {id: 1, name: "Doe"},
    ]);
    function handleChangeInput(e) {
        setNewUser(e.target.value);
    }
    function handleAddUser() {
        setUsers([...users, {id: users.length, name: newUser}]);
        setNewUser('');
    }
    return (
    <>
        <input value={newUser} onChange={handleChangeInput} />
        <button onClick={handleAddUser}>Add</button>
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>
    )
}   