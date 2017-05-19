export default function fibo(n: number): number {
    if (n < 0) throw new Error('Invalid parameter')
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : n
}
