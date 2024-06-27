import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FormControl, InputLabel, MenuItem, Select, Box, Typography } from '@mui/material';

const ChangesGraph = ({ commitData, codeFrequencyData, contributorsData }) => {
    const [changeType, setChangeType] = useState('commits');

    const handleChangeTypeChange = (event) => {
        setChangeType(event.target.value);
    };

    const getCommitData = () => {
        if (!Array.isArray(commitData)) {
            console.error('commitData is not an array:', commitData);
            return [];
        }
        return commitData.map(week => [week.week * 1000, week.total]);
    };

    const getCodeFrequencyData = () => {
        if (!Array.isArray(codeFrequencyData)) {
            console.error('codeFrequencyData is not an array:', codeFrequencyData);
            return [];
        }
        return codeFrequencyData.map(week => [
            week[0] * 1000,
            changeType === 'additions' ? week[1] : week[2]
        ]);
    };

    const getContributorData = () => {
        if (!Array.isArray(contributorsData)) {
            console.error('contributorsData is not an array:', contributorsData);
            return [];
        }
        return contributorsData.map(contributor => ({
            name: contributor.author?.login || 'Unknown',
            data: (contributor.weeks || []).map(week => [
                week.w * 1000,
                changeType === 'commits' ? week.c : (changeType === 'additions' ? week.a : week.d)
            ])
        }));
    };

    const totalChangesOptions = {
        title: { text: 'Total Changes' },
        xAxis: {
            type: 'datetime',
            labels: { format: '{value:%Y-%m-%d}' }
        },
        yAxis: { title: { text: 'Count' } },
        tooltip: {
            formatter: function () {
                return `<b>${Highcharts.dateFormat('%Y-%m-%d', this.x)}</b><br/>
                        ${this.series.name}: ${this.y}`;
            }
        },
        series: [{
            name: changeType.charAt(0).toUpperCase() + changeType.slice(1),
            data: changeType === 'commits' ? getCommitData() : getCodeFrequencyData()
        }]
    };

    const contributorChangesOptions = {
        title: { text: 'Contributor Changes' },
        xAxis: {
            type: 'datetime',
            labels: { format: '{value:%Y-%m-%d}' }
        },
        yAxis: { title: { text: 'Count' } },
        tooltip: {
            formatter: function () {
                return `<b>${Highcharts.dateFormat('%Y-%m-%d', this.x)}</b><br/>
                        ${this.series.name}: ${this.y}`;
            }
        },
        series: getContributorData()
    };

    if (!commitData || !codeFrequencyData || !contributorsData) {
        return <Typography>No data available</Typography>;
    }

    return (
        <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Change Type</InputLabel>
                <Select value={changeType} onChange={handleChangeTypeChange}>
                    <MenuItem value="commits">Commits</MenuItem>
                    <MenuItem value="additions">Additions</MenuItem>
                    <MenuItem value="deletions">Deletions</MenuItem>
                </Select>
            </FormControl>
            <HighchartsReact highcharts={Highcharts} options={totalChangesOptions} />
            <HighchartsReact highcharts={Highcharts} options={contributorChangesOptions} />
        </Box>
    );
};

export default ChangesGraph;