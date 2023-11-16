import { useCallback, useEffect, useRef, useState } from 'react'
// 倒计时hook
export function useCountDown(initCount = 10, callBack = () => {}, endBack = () => {}) {
  const timeId = useRef<{ id: number }>({ id: 0 })
  const [count, setCount] = useState(initCount)
  const [isdisable, setIsdisable] = useState(false)
  const start = () => {
    setCount(initCount)
    setIsdisable(true)
    timeId.current.id = window.setInterval(() => {
      setCount((count) => count - 1)
    }, 1000)
  }
  //   首先清除定时器
  useEffect(() => window.clearInterval(timeId.current.id), [])
  //   判断是否需要清除
  useEffect(() => {
    if (count !== initCount || isdisable) {
      callBack()
    }
    if (count === 0) {
      clearInterval(timeId.current.id)
      setCount(initCount)
      endBack()
      setIsdisable(false)
    }
  }, [callBack, count, initCount, endBack, isdisable])
  return { start, count, isdisable }
}

// 防抖hook
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 每次在上一个useEffect处理完以后再运行(这里返回的一个函数会执行当前 effect 之前对上一个 effect 进行清除)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}

// 传入一个获取信息的回调函数，设置加载状态,返回获取的结果以及是否加载中
export const useAsync = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
    total: 0,
    isNodata: false
  })
  // 返回一个函数，用于保存起来
  const retry = useRef(() => {})
  const setDate = useCallback((data: any) => {
    setState({
      data: data.data.pagingRes,
      isLoading: false,
      error: null,
      total: data.data.allTotals || 0,
      isNodata: data.data.allTotals === 0
    })
  }, [])
  const setError = (err: any) => {
    setState({
      data: null,
      isLoading: false,
      error: err,
      total: 0,
      isNodata: true
    })
  }
  const run = useCallback(
    (promise: Promise<any>, runConfig?: { retry: () => Promise<any> }) => {
      retry.current = () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      }
      setState((prevState) => ({ ...prevState, isLoading: true }))
      return promise
        .then((data) => {
          setDate(data || [])
          return data
        })
        .catch((err) => {
          setError(err)
          return err
        })
    },
    [setDate]
  )
  return {
    run,
    setDate,
    setError,
    ...state,
    retry
  }
}
// 页面挂载hook
export const useMounted = (callBack: () => void) => {
  useEffect(callBack)
}
// 无限滚动hook

/*
传入参数:
请求参数
请求api函数
监听的dom对象
*/
export const useScroll = ({
  params,
  fetchFn,
  currentDom
}: {
  params: any
  fetchFn: (value: any) => Promise<any>
  currentDom: HTMLElement | null
}) => {
  const [allData, setAllData] = useState<any[]>([])
  const [pageNo, setPageNo] = useState<number>(1)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [isInit, setIsInit] = useState<boolean>(false)
  const getData = useCallback(
    () =>
      fetchFn({
        pageNo: pageNo,
        pageSize: 1
      }),
    [fetchFn, pageNo]
  )
  const { run, isLoading, data, total, setDate } = useAsync()
  useEffect(() => {
    if (!getData || !isInit) {
      return
    }
    run(getData(), { retry: getData })
  }, [getData, run, isInit])
  // 获取数据
  useEffect(() => {
    if (data && (data as unknown as any).length > 0) {
      setAllData((value) => {
        if (value.length + (data as unknown as any).length >= total) {
          setIsEnd(true)
        }
        return [...value, ...data]
      })
    }
  }, [data, total])

  const handleScroll = useCallback(() => {
    if (isLoading || isEnd || !currentDom) {
      return
    }
    const viewHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
    if (currentDom.offsetTop - 100 < viewHeight + scrollHeight) {
      setPageNo((value: number) => {
        return value + 1
      })
    }
  }, [isLoading, currentDom, isEnd])
  // 挂载滚动事件
  useEffect(() => {
    if (isInit) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, isInit])

  const unInstall = useCallback(() => {
    setPageNo(1)
    setAllData([])
    setDate({ data: [] })
    setIsEnd(false)
    setIsInit(false)
    window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, setDate])
  const init = useCallback(() => {
    setIsInit(true)
  }, [])

  return {
    allData,
    total,
    setAllData,
    init,
    unInstall
  }
}
