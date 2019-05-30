import dotenv from 'dotenv';
dotenv.config();
export default {
    port:process.env.PORT,
    mode:process.env.NODE_ENV,
    db_url:process.env.DB_URL,
    AWS_SECRET_ACCESS_KEY:process.env. AWS_SECRET_ACCESS_KEY,
        AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    bucket_name:process.env.BUCKET_NAME,
    region:'us-east-1'
}