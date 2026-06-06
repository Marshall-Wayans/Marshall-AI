import { create } from 'zustand'

export type ConversationRole = 'user' | 'ai' | 'system'

export interface ConversationEntry {
  id: string
  role: ConversationRole
  text: string
  timestamp: number
  module?: string
}

interface AIConversationState {
  entries: ConversationEntry[]
  addEntry: (entry: Omit<ConversationEntry, 'id' | 'timestamp'>) => void
  clearHistory: () => void
}

let entryCounter = 0

export const useAIConversationStore = create<AIConversationState>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => ({
      entries: [
        {
          ...entry,
          id: `conv-${++entryCounter}`,
          timestamp: Date.now(),
        },
        ...state.entries,
      ].slice(0, 50),
    })),
  clearHistory: () => set({ entries: [] }),
}))
