import { useState, useCallback } from 'react'


interface IGlobalModelState {
  contestName?: string
  contestId?: string | number
  token?: string
}

export default function globalModal() {
  const [globalInfo, setGlobalInfo] = useState<IGlobalModelState | undefined>(undefined)

  return {
    globalInfo,
    setGlobalInfo
  }
}