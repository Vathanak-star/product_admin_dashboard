import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import userService from '../../services/users'

export default function Users(){
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.users().then(result => {
            console.log(result.status)
            setUsers(result.data)
        })
    },[])


    const columns = [
      { field: 'id', headerName: 'ID', flex: 1},
      {
        field: 'name',
        headerName: 'Username',
        flex: 1
      },
      {
        field: 'email',
        headerName: 'Google Map',
        flex: 1
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1
      },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <User2Icon className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">Users</h1>
            </div>


            <div className="flex items-center justify-center p-4">
                <Box sx={{ height: 600, width: '100%'}}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 12,
                            },
                        },
                        }}
                        pageSizeOptions={[12]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    )
}