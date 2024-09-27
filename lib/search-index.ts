import { searchPostIndex } from '#site/content';
import { getHeaderNavLinks, type Link } from './navigation';

export type SearchItem = Link & {
  icon?: string;
  disabled?: boolean;
  external?: boolean;
};

export type SearchGroup = Partial<SearchItem> & {
  title: SearchItem['title'];
  type?: 'group' | 'page' | 'content-id';
  items?: SearchGroup[];
};

export function getSearchIndex(): SearchGroup[] {
  return [
    {
      title: 'Navigation',
      type: 'group',
      items: getHeaderNavLinks().map((link) => ({
        type: 'page',
        title: link.title,
        url: link.url,
      })),
    },
    {
      title: 'Posts',
      type: 'group',
      items: searchPostIndex.map((post) => ({
        type: 'page',
        title: post.title,
        url: post.url,
        items: post.items.map((item) => ({
          type: 'content-id',
          title: item.title,
          url: item.url,
        })),
      })),
    },
  ];
}
