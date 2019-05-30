import s3 from '../awsClient';

export default class S3Service {
    deleteObject(params){
        s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack);  // error
            else     console.log();                 // deleted
        });
    }
}