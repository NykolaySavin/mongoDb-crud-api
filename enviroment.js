import dotenv from 'dotenv';
dotenv.config();
export default {
    port:process.env.PORT,
    mode:process.env.NODE_ENV,
    db_url:process.env.DB_URL,

}