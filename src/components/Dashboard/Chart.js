import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useEffect, useState } from "react";
import { getLoggedPharmacyOrders, getLoggedPharmacyOrdersToday } from "../../api/index";

// // Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

// const data = [
//     createData('00:00', 0),
//     createData('03:00', 300),
//     createData('06:00', 600),
//     createData('09:00', 800),
//     createData('12:00', 1500),
//     createData('15:00', 2000),
//     createData('18:00', 2400),
//     createData('21:00', 2400),
//     createData('24:00', undefined),
// ];

export default function Chart() {
    const theme = useTheme();
    const [orders, setOrders] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    const [pharmacySales, setPharmacySales] = useState(0);

    useEffect(async () => {
        const res = await getLoggedPharmacyOrdersToday(loggedUser._id);
        if (res.status == 200) {
            setOrders(res.data)
        }
    }, []);

    var data = [];

    orders?.cartPharma?.map(order => {
        var d = new Date(order.createdAt)
        console.log("data", order.createdAt)
        data.push(createData(d.getHours(), order.totalPrice))
    })
    console.log("dataa", data)


    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales (L.L.)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}