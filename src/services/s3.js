import AWS from 'aws-sdk'
import md5 from 'md5'

const albumBucketName = process.env.VUE_APP_BUCKET_NAME
const bucketRegion = process.env.VUE_APP_REGION
const IdentityPoolId = process.env.VUE_APP_IDENTITY_POOL_ID

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
})

export const uploadPhoto = photo => {
    // Use S3 ManagedUpload class as it supports multipart uploads
    const extension = photo.name.split('.').pop()
    const key = `${md5(photo.name + String(Math.random()))}.${extension}`

    const upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: albumBucketName,
            Key: key,
            Body: photo,
            ACL: "public-read"
        }
    })

    return upload.promise()
}
