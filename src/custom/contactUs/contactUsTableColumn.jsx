// components/ContactUs/ContactUsTable.jsx
import React, { useEffect, useState } from 'react';
import CustomTable from '../../custom/Table';
import { Box, InputBase, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { Eye, Reply, Trash2 } from 'lucide-react';
import { fetchContacts, deleteContact } from '../../scenes/ContactUs/contactUsService';
import { CustomIconButton } from '../Button';
import { showErrorToast, showSuccessToast } from "../../Toast";

const ContactUsTable = ({ onView, onReply }) => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const columns = [
        // { field: 'queryNo', headerName: 'Query No', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        // { field: 'phone', headerName: 'Phone', width: 150 },
        {
            field: 'message',
            headerName: 'Message',
            width: 250,
            renderCell: (params) => (
                <span>{params.row.message.length > 50 ? params.row.message.substring(0, 50) + "..." : params.row.message}</span>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Box display="flex" gap={1}>
                    <CustomIconButton
                        icon={<Eye size={20} color="white" />}
                        color="rgb(77 141 225)"
                        onClick={() => onView(params.row)}
                    />
                    <CustomIconButton
                        icon={<Trash2 size={18} />}
                        color="hsl(0 84.2% 60.2%)"
                        onClick={() => handleDelete(params.row._id)}
                    />
                </Box>
            ),
        },
        {
            field: 'reply',
            headerName: 'Reply',
            flex: 0.3,
            renderCell: (params) => (
                <Box display="flex" gap={1}>
                    {params.row.isReplied ? (
                        <CustomIconButton
                            icon={<Reply size={20} color="gray" />}
                            color="#d3d3d3" // Light gray to indicate it's replied
                            disabled={true} // Disable button if already replied
                            label="Replied"
                        />
                    ) : (
                        <CustomIconButton
                            icon={<Reply size={20} color="white" />}
                            color="rgb(77 141 225)"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent row click
                                onReply(params.row); // Trigger reply dialog
                            }}
                            label="Reply"
                        />
                    )}
                </Box>
            ),
        }


    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await fetchContacts();
            setContacts(data);
            setFilteredContacts(data);
        } catch {
            showErrorToast("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this query?")) {
            try {
                await deleteContact(id);
                showSuccessToast("Query deleted successfully");
                fetchData();
            } catch {
                showErrorToast("Failed to delete query");
            }
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = contacts.filter((contact) =>
            contact.email.toLowerCase().includes(value)
            // contact.queryNo.toLowerCase().includes(value)
        );
        setFilteredContacts(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                mb={2}
                sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <InputBase
                    placeholder="Search by email"
                    value={searchText}
                    onChange={handleSearch}
                    sx={{
                        flex: 1,
                        px: 2,
                        py: 1.2,
                        backgroundColor: '#fff',
                    }}
                />
                <IconButton
                    type="button"
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: 0,
                        height: '100%',
                        '&:hover': {
                            backgroundColor: '#e0e0e0',
                        }
                    }}
                >
                    <SearchOutlined sx={{ color: '#555' }} />
                </IconButton>
            </Box>

            <CustomTable columns={columns} rows={filteredContacts} loading={loading} />
        </>
    );
};

export default ContactUsTable;
