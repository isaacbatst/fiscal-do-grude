import knex from 'knex';
import config from '../../knexfile';
import './tables/debtors';

const connection = knex(config.development);

export default connection;