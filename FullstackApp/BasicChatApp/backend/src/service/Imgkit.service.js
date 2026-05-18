const ImageKit  = require('imagekit');


const imagekit = new ImageKit({
  publicKey: process.env.your_public_key,
  privateKey: process.env.your_private_key,
  urlEndpoint: process.env.your_url_endpoint
});

 async function uploadFile(file,fileName) {
  const imgUrl = await imagekit.upload({
    file:file,
    fileName:fileName,
    folder:"chort_imges"
  })
  return imgUrl.url
}

module.exports = uploadFile