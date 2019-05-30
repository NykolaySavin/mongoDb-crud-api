import aws from 'aws-sdk';
import config from './enviroment';

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region:config.region
});

const s3 = new aws.S3();
export default s3;