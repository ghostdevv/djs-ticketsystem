import pkg from '../../package.json';
import axios from 'axios';

export const createRequest = (token: string) =>
    axios.create({
        baseURL: 'https://discord.com/api/',
        headers: {
            Authorization: `Bot ${token}`,
            'User-Agent': `djs-ticketsystem / v${pkg.version}`,
        },
    });
