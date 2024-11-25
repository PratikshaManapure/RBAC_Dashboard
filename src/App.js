import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ]);
  const [permissions, setPermissions] = useState(["Read", "Write", "Delete"]);
  const [userForm, setUserForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [roleForm, setRoleForm] = useState({
    id: null,
    name: "",
    permissions: [],
  });
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleForm({ ...roleForm, [name]: value });
  };

  const handlePermissionToggle = (permission) => {
    const updatedPermissions = roleForm.permissions.includes(permission)
      ? roleForm.permissions.filter((perm) => perm !== permission)
      : [...roleForm.permissions, permission];
    setRoleForm({ ...roleForm, permissions: updatedPermissions });
  };

  // User Management Handlers
  const addUser = () => {
    if (!userForm.name || !userForm.email || !userForm.role) return;
    if (isEditingUser) {
      setUsers(
        users.map((user) =>
          user.id === userForm.id ? { ...userForm } : user
        )
      );
      setIsEditingUser(false);
    } else {
      setUsers([...users, { ...userForm, id: Date.now() }]);
    }
    setUserForm({ id: null, name: "", email: "", role: "", status: "Active" });
  };

  const editUser = (user) => {
    setUserForm(user);
    setIsEditingUser(true);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Role Management Handlers
  const addRole = () => {
    if (!roleForm.name) return;
    if (isEditingRole) {
      setRoles(
        roles.map((role) =>
          role.id === roleForm.id ? { ...roleForm } : role
        )
      );
      setIsEditingRole(false);
    } else {
      setRoles([...roles, { ...roleForm, id: Date.now() }]);
    }
    setRoleForm({ id: null, name: "", permissions: [] });
  };

  const editRole = (role) => {
    setRoleForm(role);
    setIsEditingRole(true);
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="container">
      <h1>Role-Based Access Control (RBAC) Dashboard</h1>

      {/* User Management */}
      <h2>User Management</h2>
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userForm.name}
          onChange={handleUserInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userForm.email}
          onChange={handleUserInputChange}
        />
        <select
          name="role"
          value={userForm.role}
          onChange={handleUserInputChange}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={userForm.status}
          onChange={handleUserInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={addUser}>
          {isEditingUser ? "Edit User" : "Add User"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role Management */}
      <h2>Role Management</h2>
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Role Name"
          value={roleForm.name}
          onChange={handleRoleInputChange}
        />
        <div>
          {permissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={roleForm.permissions.includes(permission)}
                onChange={() => handlePermissionToggle(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
        <button onClick={addRole}>
          {isEditingRole ? "Edit Role" : "Add Role"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button onClick={() => editRole(role)}>Edit</button>
                <button onClick={() => deleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
