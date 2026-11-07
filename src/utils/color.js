function channel(value) {
    const c = value / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function luminance(hex) {
    const n = parseInt(hex.slice(1), 16)
    return (
        0.2126 * channel((n >> 16) & 255) +
        0.7152 * channel((n >> 8) & 255) +
        0.0722 * channel(n & 255)
    )
}

export function isLight(hex) {
    return luminance(hex) > 0.4
}

// Couleurs de texte lisibles sur un fond donné
export function textColors(bgHex) {
    return isLight(bgHex)
        ? { text: '#2b1f2a', muted: '#5e4b5a' }
        : { text: '#f5f0e8', muted: '#b8b0c8' }
}

// Couleur de texte lisible sur un bouton de cette couleur
export function onColor(hex) {
    return isLight(hex) ? '#1a1218' : '#ffffff'
}