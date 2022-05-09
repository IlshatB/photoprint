export const commentWord = (n) => {
    if (n === 1 || (n / 10 === 1 && n !== 11)) {
        return 'комментарий'
    }
    if (n === 2 || n / 10 === 2 || n === 3 || n / 10 === 3) {
        return 'комментария'
    }
    return 'комментариев'
}