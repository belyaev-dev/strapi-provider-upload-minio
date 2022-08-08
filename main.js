const Minio = require('minio');

module.exports = {
  init({ port, useSSL, endPoint, accessKey, secretKey, bucket, assetsRoot }) {
    const MINIO = new Minio.Client({
      endPoint,
      port: parseInt(port, 10) || 9000,
      useSSL: useSSL === 'true',
      accessKey,
      secretKey
    });

    const getUploadPath = (file) => {
      const path = file.path ? `${file.path}/` : '';
      return `${path}${file.hash}${file.ext}`;
    };

    const getDeletePath = (file) => {
      const hostPart = `${assetsRoot}/`;
      return file.url.replace(hostPart, '');
    };

    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          // upload file to a bucket
          const path = getUploadPath(file);
          const metaData = { 'Content-Type': file.mime ? file.mime : 'application/octet-stream' };

          MINIO.putObject(bucket, path, Buffer.from(file.buffer, 'binary'), metaData, (err, _etag) => {
            if (err) return reject(err);
            file.url = `${assetsRoot}/${path}`;
            resolve();
          });
        });
      },

      delete(file) {
        return new Promise((resolve, reject) => {
          const path = getDeletePath(file);
          MINIO.removeObject(bucket, path, (err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      }
    };
  }
};
