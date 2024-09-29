import { searchPostIndex } from '#site/content'
import { getHeaderNavLinks, type Link } from './navigation'

export type SearchItem = Link & {
  items: SearchItem[]
  type: 'page' | 'content-id'
  icon?: string
  disabled?: boolean
  external?: boolean
}

export interface SearchGroup {
  type: 'group'
  title: string
  items: SearchItem[]
}

export interface SearchIndex {
  navigation: SearchGroup
  posts: SearchGroup
}

export function getSearchIndex(): SearchIndex {
  return {
    navigation: {
      title: 'Navigation',
      type: 'group',
      items: getHeaderNavLinks().map(link => ({
        type: 'page',
        title: link.title,
        url: link.url,
        items: [],
      })),
    },
    posts: {
      title: 'Posts',
      type: 'group',
      items: searchPostIndex.map(post => ({
        type: 'page',
        title: post.title,
        url: post.url,
        items: post.items.map(item => ({
          type: 'content-id',
          title: item.title,
          url: item.url,
          items: [],
        })),
      })),
    },
  }
}
