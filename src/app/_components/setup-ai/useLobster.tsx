import { create } from 'zustand'

export const useLobsters = create(() => {
  return {
    lobsters: [] as any[],
  }
})
