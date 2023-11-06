import { useState } from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'ready' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'ready',
    data: null,
    error: null
}
const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, initialConfig }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    // run 来触发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({ ...state, stat: 'loading' })
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            // catch会消化异常，如果不主动抛出，外面接收不到异常
            setError(error)
            if (config.throwOnError) return Promise.reject(error)
            return error
        })
    }

    return {
        isReady: state.stat === 'ready',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}
