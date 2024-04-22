const sumA = (n) => {
    let sum = 0
    for (let i = 0; i <= n; i++) {
        sum += i
    }
    console.log('check sum A:', sum)
}
sumA(5)

const sumB = (n) => {
    const sum = Array.from({ length: n }, (_, i) => i).reduce((sum, i) => sum + i, n)
    console.log('check sum B:', sum)
}
sumB(5)

const sumC = (n) => {
    const sum = (n * (n + 1) / 2)
    console.log('check sum C:', sum)
}
sumC(5)