export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'reviewing'

export type ApprovalPriority = 'low' | 'medium' | 'high' | 'critical'

export interface ApprovalItem {
  id: string
  title: string
  module: string
  requestedBy: string
  status: ApprovalStatus
  priority: ApprovalPriority
  createdAt: number
  summary: string
}

export interface ApprovalStats {
  pending: number
  reviewing: number
  approved: number
  rejected: number
}
