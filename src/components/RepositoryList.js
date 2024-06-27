import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepositoriesStart } from '../redux/slices/repositoriesSlice';
import RepositoryItem from './RepositoryItem';
import { FormControl, InputLabel, MenuItem, Select, Box, CircularProgress, Alert } from '@mui/material';
import { subDays } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatDate } from '../utils/dateUtils';

const RepositoryList = () => {
    const dispatch = useDispatch();
    const { repositories, status, error, page, hasMore } = useSelector((state) => state.repositories);
    const [dateRange, setDateRange] = useState('30');

    useEffect(() => {
        loadRepositories(1);
    }, [dispatch, dateRange]);

    const loadRepositories = (pageNum) => {
        const date = formatDate(subDays(new Date(), parseInt(dateRange)));
        dispatch(fetchRepositoriesStart({ date, page: pageNum }));
    };

    const handleDateRangeChange = (event) => {
        setDateRange(event.target.value);
        loadRepositories(1);
    };

    const loadMore = () => {
        if (hasMore) {
            loadRepositories(page + 1);
        }
    };

    return (
        <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Date Range</InputLabel>
                <Select value={dateRange} onChange={handleDateRangeChange}>
                    <MenuItem value="7">Last 1 week</MenuItem>
                    <MenuItem value="14">Last 2 weeks</MenuItem>
                    <MenuItem value="30">Last 1 month</MenuItem>
                </Select>
            </FormControl>
            {status === 'failed' && <Alert severity="error">{error}</Alert>}
            <InfiniteScroll
                dataLength={repositories.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<CircularProgress />}
            >
                {repositories.map((repo) => (
                    <RepositoryItem key={repo.id} repo={repo} />
                ))}
            </InfiniteScroll>
            {status === 'loading' && page === 1 && <CircularProgress />}
        </Box>
    );
};

export default RepositoryList;