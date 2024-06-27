import React from 'react';
import { Card, CardContent, Typography, Avatar, CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const RepositoryItem = ({ repo }) => (
    <Card sx={{ mb: 2 }}>
        <CardActionArea component={Link} to={`/repository/${repo.owner.login}/${repo.name}`}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={repo.owner.avatar_url} sx={{ mr: 2 }} />
                    <Typography variant="h6">{repo.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>{repo.description}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Stars: {repo.stargazers_count}</Typography>
                    <Typography variant="body2">Issues: {repo.open_issues_count}</Typography>
                    <Typography variant="body2">
                        Last pushed {formatDistanceToNow(new Date(repo.pushed_at))} ago by {repo.owner.login}
                    </Typography>
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>
);

export default RepositoryItem;