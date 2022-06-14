export function showQuest(
    message,
    type = 'default',
) {
    return {
        type: '@quest/SHOW',
        payload: { type, message },
    };
}

export function hideQuest() {
    return {
        type: '@quest/HIDE'
    }
}