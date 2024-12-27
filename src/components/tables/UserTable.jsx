import React, { useState } from "react";
import { Table } from "rsuite";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../store/api/userApi";
// import AddUser from "../models/AddUser";
import Swal from "sweetalert2";

const { Column, HeaderCell, Cell } = Table;

function UserTable({ tableHeight , AddUser,}) {
  const {
    data: getAllUsers,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = getAllUsers?.users || [];

  const handleEditItem = (user) => {
    setSelectedUserId(user._id);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedUserId(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load users.</div>;
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteUser(id).unwrap();
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response,
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: response || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text:
            error?.data?.payload ||
            error.message ||
            "Unable to delete User. Please try again later.",
        });
      }
    }
  };

  return (
    <div>
      <Table
        height={tableHeight}
        data={users}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
        style={{ width: "100%" }}
      >
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Contact No</HeaderCell>
          <Cell dataKey="contactNo" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Gender</HeaderCell>
          <Cell dataKey="gender" />
        </Column>
        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">Address</HeaderCell>
          <Cell dataKey="address" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Username</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Role</HeaderCell>
          <Cell dataKey="roleId" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer text-blue-500"
                  onClick={() => handleEditItem(rowData)}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(rowData._id);
                  }}
                >
                  delete
                </span>
              </>
            )}
          </Cell>
        </Column>
      </Table>

      {isEditOpen && (
        <AddUser
          open={isEditOpen}
          handleClose={handleCloseEdit}
          userId={selectedUserId}
        />
      )}
    </div>
  );
}

export default UserTable;
