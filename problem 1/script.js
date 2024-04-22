const sumA = (n) => {
    let sum = 0
    for (let i = 0; i <= n; i++) {
        sum += i
    }
}
sumA(5)

const sumB = (n) => {
    const sum = Array.from({ length: n }, (_, i) => i).reduce((sum, i) => sum + i, n)
}
sumB(5)

const sumC = (n) => {
    const sum = (n * (n + 1) / 2)
}
sumC(5)