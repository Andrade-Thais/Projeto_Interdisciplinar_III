
export async function getMaxPhotosForAFolder(photosNumber, numberOfFolders) {
    const maxPhotos = photosNumber / numberOfFolders
    return Math.floor(maxPhotos)
}
