// const IMAGE_URL_KEY = 'imageUrls';

// /**
//  * Check if image exist
//  * @param {{
//  *  url: string,
//  *  callback: (imageExist: boolean) => void
//  * }} param
//  * */
// export function checkIfImageExists(props: {
//   url: string;
//   callback: (imageExist: boolean) => void;
// }): Promise<any> {
//   const { url = '' } = props;
//   return new Promise((resolve, reject) => {
//     const img = new Image();

//     img.src = url;

//     if (img.complete) {
//       resolve('');
//     } else {
//       img.onload = () => {
//         resolve('');
//       };
//       img.onerror = () => {
//         reject();
//       };
//     }
//   });
// }

// /**
//  * Get all images from IMAGE_URL_KEY localstorage item
//  */
// function getImageObjectUrls() {
//   const imageUrls = localStorage.getItem(IMAGE_URL_KEY);
//   const imageUrlsParsed = JSON.parse(imageUrls);

//   return imageUrlsParsed;
// }

// /**
//  * Clear all images from IMAGE_URL_KEY localstorage item.
//  */
// function clearImageObjectUrls() {
//   localStorage.removeItem(IMAGE_URL_KEY);
// }

// /**
//  * Pass id to get image property from IMAGE_URL_KEY localstorage item.
//  */
// function getImageObjectUrl(props: { id: string }) {
//   const { id } = props;
//   const imageUrls = getImageObjectUrls();
//   return imageUrls?.[id];
// }

// /**
//  * Pass id and imageProp. To set imageProp under given id in IMAGE_URL_KEY localstorage item.
//  * @param {{
//  *  id: string,
//  *  imageProp: {[key: string]: *}
//  * }} param
//  */
// function setImageObjectUrl({ id = '', imageProp = {} }) {
//   const imageUrls = getImageObjectUrls();

//   localStorage.setItem(
//     IMAGE_URL_KEY,
//     JSON.stringify({
//       ...imageUrls,
//       [id]: imageProp,
//     })
//   );
// }

// /**
//  * Caches blob data and get URL to access the cached blob.
//  * @param {{
//  *  alt: string,
//  *  blob: any,
//  *  id: string,
//  *  size: number,
//  *  title: string,
//  * }} param
//  * @returns {string} The blob URL.
//  */
// function createImageObjectUrl({ id = '', blob = '', alt = '', size = 0, title = '' }) {
//   const urlCreator = window.URL || window.webkitURL;
//   const imageUrl = urlCreator.createObjectURL(blob);

//   setImageObjectUrl({ id, imageProp: { src: imageUrl, alt, size, title } });

//   return imageUrl;
// }

// /**
//  * API to store and retrive file blob from chrome file store.
//  * It allows faster fetching of stored files.
//  */
// export const imageObjectUrlApis = {
//   clearUrls: clearImageObjectUrls,
//   createUrl: createImageObjectUrl,
//   getUrl: getImageObjectUrl,
//   getUrls: getImageObjectUrls,
//   setUrl: setImageObjectUrl,
// };

// /**
//  * Parse given string and return array of image markdowns in the given string.
//  * @param {{
//  *  attachmentsString: string,
//  *  regex: any,
//  * }} param
//  * @returns {string[]}
//  */
// export function getAttachmentsFromString({
//   attachmentsString = '',
//   regex = REGEX_PATTERNS.IMAGE_MARKDOWN,
// }) {
//   const matchedImages = attachmentsString.match(new RegExp(regex, 'g'));

//   if (matchedImages && Array.isArray(matchedImages) && matchedImages.length > 0) {
//     return matchedImages.map((imageMarkdown) => {
//       const parsedImageMarkdown = imageMarkdown.match(regex);
//       const imageProps = get(parsedImageMarkdown, ['groups'], {});
//       const { alt = '', src = '', title = '' } = imageProps;

//       return { alt, src, title };
//     });
//   }

//   return [];
// }
