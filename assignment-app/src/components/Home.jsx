import React, { memo, useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import { PieChart, Pie } from 'recharts';

import { useSelector } from 'react-redux'

import { useState } from 'react';
import { addListener } from '@reduxjs/toolkit';
function Home() {

    //Data for Cards
    const insight_summary = useSelector((state) => state.dashboard.insight_summary);

    const [summary, setSummary] = useState({});

    useEffect(() => {
        setSummary(insight_summary);
    }, []);

    // Convert object properties to an array for mapping
    const summaryArray = Object.keys(summary).map((key) => ({
        key: key,
        value: summary[key],
    }));







    //CHART NO 1 DATA
    const chartdata1 = useSelector((state) => state.dashboard.category_distribution)
    console.log(chartdata1)

    const data = Object.keys(chartdata1).map((category) => ({
        name: category,
        value: chartdata1[category],
    }));






    //CHART NO 2

    const dayWiseResponseTimes = useSelector(state => state.dashboard.response_times.day_wise);
    const weekWiseResponseTimes = useSelector(state => state.dashboard.response_times.week_wise);

    const dailyData = dayWiseResponseTimes.map(item => ({
        name: item.date,
        dailyAverage: item.average_time,
    }));

    const weeklyData = weekWiseResponseTimes.map(item => ({
        name: `Week ${item.week}`,
        weeklyAverage: item.average_time,
    }));

    const [selectedOption, setSelectedOption] = useState('daily');
    const data1 = selectedOption === 'daily' ? dailyData : weeklyData;


    //3RD CHART

    const colorScheme = ['#8884d8', '#82ca9d', '#ffc658', '#c026d3', '#FF3300']; // Define your custom colors
    const userSatisfactionData = useSelector(state => state.dashboard.user_satisfaction.ratings);

    const data3 = userSatisfactionData.map((item, index) => ({
        rating: item.rating,
        count: item.count,
        fill: colorScheme[index % colorScheme.length], // Assign colors based on the index
    }));


    
    const toggle=()=>{

        if(selectedOption=='daily'){
            setSelectedOption('weekly')
        }
        else if (selectedOption=='weekly'){
            setSelectedOption('daily')
        }
    }




    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                {Object.keys(summary).map((key, index) => (
                    <div className="card" key={index}>
                        <div className="card-inner">
                            <h3>{key}</h3>
                            <BsFillArchiveFill className="card_icon" />
                        </div>
                        <h1>{summary[key]}</h1>
                    </div>
                ))}


            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />


                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>





                <ResponsiveContainer width="100%" height={300}>

                    <LineChart
                        onClick={toggle}
                        width={500}
                        height={300}
                        data={data1}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedOption === 'daily' && (
                            <Line type="monotone" dataKey="dailyAverage" name="Daily Average" stroke="#8884d8" activeDot={{ r: 8 }} />
                        )}
                        {selectedOption === 'weekly' && (
                            <Line type="monotone" dataKey="weeklyAverage" name="Weekly Average" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        )}
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie dataKey="count" data={data3} nameKey="rating" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>




                



            </div>
        </main>
    )
}



export default memo(Home)