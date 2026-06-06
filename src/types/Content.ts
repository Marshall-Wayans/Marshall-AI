export type ContentStage =
  | 'idea'
  | 'script'
  | 'storyboard'
  | 'video'
  | 'thumbnail'
  | 'published'

export interface ContentItem {
  id: string
  title: string
  stage: ContentStage
  progress: number
  agent: string
  updatedAt: number
}

export interface ContentPipeline {
  ideas: ContentItem[]
  scripts: ContentItem[]
  storyboards: ContentItem[]
  videos: ContentItem[]
  thumbnails: ContentItem[]
}
