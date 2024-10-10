/**
 * Позволяет вызвать функцию раз за определенное время
 * @param callback функция, к которой нужно применить throttle
 * @param ms время в миллисекуднах
 */
const useThrottle = (callback: Function, ms: number): Function => {
    const timer = isTimeDone(ms)
    return () => timer.next().value ? callback() : 0
}

/**
 * Механизм троттлинга
 * @param ms
 */
function* isTimeDone(ms: number) {
    let canCallFunction = true

    while (true) {
        if (canCallFunction) {
            canCallFunction = false
            setTimeout(() => {
                canCallFunction = true
            }, ms)
            yield true
        } else {
            yield false
        }
    }
}

export {useThrottle}