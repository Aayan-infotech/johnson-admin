import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import OrderTableSection from "./OrderTableSection";

const orderStatuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const OrderTabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (_, newValue) => setSelectedTab(newValue);

    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange}>
                {orderStatuses.map((status) => (
                    <Tab key={status} label={status.charAt(0).toUpperCase() + status.slice(1)} />
                ))}
            </Tabs>

            <Box mt={2}>
                <OrderTableSection status={orderStatuses[selectedTab]} />
            </Box>
        </>
    );
};

export default OrderTabs;
