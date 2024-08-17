export const getImageWidth = async (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(`${img.naturalWidth}`);
        };
        img.onerror = () => {
            reject(new Error("Could not load image"));
        };
        img.src = imageUrl;
    });
}

export const getImageHeight = async (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(`${img.naturalHeight}`);
    };
    img.onerror = () => {
      reject(new Error("Could not load image"));
    };
    img.src = imageUrl;
  });
};