// pages/ContactUsPage.jsx
import React, { useState } from 'react';
import ContactUsTable from '../../custom/contactUs/contactUsTableColumn';
import ContactUsDialog from '../../components/contactUsDialogueBox';
import { Container } from '@mui/material';
import ReplyDialog from '../../components/contactUs/replyDialogeBox';
import { fetchContacts } from './contactUsService';

const ContactUsPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openReplyDialog, setOpenReplyDialog] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleView = (contact) => {
        setSelectedContact(contact);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedContact(null);
    };

    //   const handleReplyDialogue = () => {
    //     setSelectedContact(contact);
    //     setOpenReplyDialog(true)
    //   }

    const onReply = (row) => {
        //console.log(row, "row")

        setSelectedContact(row);
        //console.log(row, "row")
        setOpenReplyDialog(true);
    };

    const handleCloseReplyDialog = () => {
        setOpenReplyDialog(false);
        setSelectedContact(null);
    };



    return (
        <Container maxWidth="lg">
            <ContactUsTable onView={handleView} onReply={onReply}/>
            {selectedContact && (
                <ContactUsDialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    contact={selectedContact}
                />
            )}
            <ReplyDialog
                open={openReplyDialog}
                handleClose={handleCloseReplyDialog}
                contact={selectedContact}
                refreshData={fetchContacts} // Optional: Refresh data after reply
            />
        </Container>
    );
};

export default ContactUsPage;
