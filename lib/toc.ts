import { type TocEntry } from '@/types/velite';

export function flatTableOfContent(toc: TocEntry): TocEntry[] {
  if (!toc.items) {
    return [toc];
  }
  return [{ ...toc, items: [] }, ...toc.items.flatMap(flatTableOfContent)];
}

export function transformToSearchableToc<
  T extends { url: string; items: TocEntry[] },
>(data: T): T {
  const items = data.items
    .flatMap(flatTableOfContent)
    .map((toc) => ({ ...toc, url: data.url.concat(toc.url) }));

  return { ...data, items };
}
