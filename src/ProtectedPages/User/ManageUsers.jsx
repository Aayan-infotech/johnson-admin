import React, { useEffect, useState } from "react";
import CustomTable from "../CustomTable";
import { fetchUsers } from "../../api/userApi";

export default function ManageUser({ setSelectedPage }) {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    const result = data.data
    
    const formattedData = result.map((user) => ({
      ...user,
      id: user._id,
    }));
  
    setUserRows(formattedData);
    
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      loadUsers(); // Refresh user list after deletion
    }
  };

  const handleViewUser = (user) => {
    alert(`Viewing User: ${user.userName}`);
  };

  const userColumns = [
    { field: "userId", headerName: "ID", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "mobile", headerName: "Mobile Number", width: 150 },
    // {
    //   field: "profileImage",
    //   headerName: "Profile Image",
    //   width: 120,
    //   renderCell: (params) => (
    //     <img
    //       src={params.row.profileImage || "https://via.placeholder.com/50"}
    //       alt="Profile"
    //       style={{ width: 50, height: 50, borderRadius: "50%" }}
    //     />
    //   ),
    // },
  ];

  return (
    <CustomTable
      title="User Management"
      rows={userRows}
      columns={userColumns}
      getRowId={(row) => row._id}
      onDelete={handleDeleteUser}
      onView={handleViewUser}
      onBack={() => setSelectedPage("home")}
    />
  );
}
