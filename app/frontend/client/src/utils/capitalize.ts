export const capitalize = (word: string) => {

    if (typeof word !== 'string') {
        throw new Error('Input must be a string');
    }
    if (word.length === 0) {
        return word;
    }

    if (word.split(' ').length > 1) {
        return word.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    } else {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}