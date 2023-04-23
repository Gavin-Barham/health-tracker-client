export default function convertKeyName(keyName) {
    return keyName.split('_').map(key => key[0].toUpperCase() + key.slice(1)).join(' ')
}