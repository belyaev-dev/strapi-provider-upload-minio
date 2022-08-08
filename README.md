# strapi-provider-upload-minio

This upload provider uses the [JavaScript Minio.Client](https://docs.min.io/docs/javascript-client-api-reference.html) to upload files to a (self-hosted) instance of [MinIO](https://min.io/). Forked from https://github.com/flyce/strapi-provider-upload-minio-ce.

## Configuration

```js
// file: ./config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@proscom/strapi-provider-upload-minio',
      providerOptions: {
        accessKey: env('MINIO_ACCESS_KEY', 'username'),
        secretKey: env('MINIO_SECRET_KEY', 'password'),
        bucket: env('MINIO_BUCKET', 'bucket'),
        endPoint: env('MINIO_ENDPOINT', 'localhost'),
        port: env('MINIO_PORT', '9000'),
        useSSL: env('MINIO_USE_SSL', 'false'),
        assetsRoot: env('MINIO_ASSETS_ROOT', 'http://localhost:9000/bucket')
      }
    }
  }
});
```
