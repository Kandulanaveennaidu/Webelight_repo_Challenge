import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import ChangesGraph from './ChangesGraph';
import { fetchRepositoryDetails } from '../api/github';

const RepositoryDetails = () => {
    const { owner, repo } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchRepositoryDetails(owner, repo);
                setDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [owner, repo]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box>
            <Typography variant="h4" mb={2}>{repo} Details</Typography>
            {details && (
                <ChangesGraph
                    commitData={details.commitActivity}
                    codeFrequencyData={details.codeFrequency}
                    contributorsData={details.contributors}
                />
            )}
        </Box>
    );
};

export default RepositoryDetails;