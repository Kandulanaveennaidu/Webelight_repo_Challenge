import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchRepositories = async (date, page = 1) => {
    const response = await axios.get(`${BASE_URL}/search/repositories`, {
        params: {
            q: `created:>${date}`,
            sort: 'stars',
            order: 'desc',
            page,
            per_page: 30,
        }
    });
    return response.data;
};

export const fetchRepositoryDetails = async (owner, repo) => {
    const [commitActivity, codeFrequency, contributors] = await Promise.all([
        axios.get(`${BASE_URL}/repos/${owner}/${repo}/stats/commit_activity`),
        axios.get(`${BASE_URL}/repos/${owner}/${repo}/stats/code_frequency`),
        axios.get(`${BASE_URL}/repos/${owner}/${repo}/stats/contributors`)
    ]);

    return {
        commitActivity: commitActivity.data,
        codeFrequency: codeFrequency.data,
        contributors: contributors.data
    };
};