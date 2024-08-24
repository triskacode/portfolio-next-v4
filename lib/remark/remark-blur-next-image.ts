import { basename } from 'node:path';
import { readFile } from 'node:fs/promises';
import { assets, getImageMetadata, type Output as VeliteOutput } from 'velite';
import type { Root } from 'mdast';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import { visit } from 'unist-util-visit';
import { isAbsoluteUrl } from '../utils';

type BlurNextImageOptions = Pick<VeliteOutput, 'base' | 'assets'>;
const emptyOptions: BlurNextImageOptions = {
  base: '/static/',
  assets: 'public/static',
};

export function remarkBlurNextImage(options?: BlurNextImageOptions) {
  const settings = { ...emptyOptions, ...(options ?? {}) };

  function isVeliteAsset(path: string): boolean {
    return path.startsWith(settings.base);
  }

  function isBlurable(node: MdxJsxFlowElement): boolean {
    return (
      node.name === 'Image' &&
      (node.attributes as MdxJsxAttribute[]).some(
        (attr) =>
          attr.name === 'src' &&
          (isAbsoluteUrl(String(attr.value)) ||
            isVeliteAsset(String(attr.value))),
      )
    );
  }

  return async (tree: Root) => {
    const imageNodes = new Map<string, MdxJsxFlowElement[]>();

    visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
      if (isBlurable(node)) {
        const src = (node.attributes as MdxJsxAttribute[]).find(
          (attr) => attr.name === 'src',
        )?.value as string;
        const imageNode = imageNodes.get(src) ?? [];

        imageNode.push(node);
        imageNodes.set(src, imageNode);
      }
    });

    await Promise.all(
      Array.from(imageNodes.entries()).map(async ([src, _nodes]) => {
        let buffer = Buffer.from('');

        if (isVeliteAsset(src)) {
          // e.g foo.png?foo=bar#baz
          const queryIdx = src.indexOf('?');
          const hashIdx = src.indexOf('#');
          const index = Math.min(
            queryIdx > 0 ? queryIdx : Infinity,
            hashIdx > 0 ? hashIdx : Infinity,
          );
          const path = index > 0 ? src.slice(0, index) : src;

          const filePath = assets.get(basename(path));
          if (!filePath) return Promise.resolve();

          buffer = await readFile(filePath);
        }

        if (isAbsoluteUrl(src)) {
          const response = await fetch(src);
          const arrBuffer = await response.arrayBuffer();

          buffer = Buffer.from(arrBuffer);
        }

        if (buffer.length === 0) return Promise.resolve();

        const metadata = await getImageMetadata(buffer);
        if (!metadata) return Promise.resolve();

        const attributes = {
          blurDataURL: metadata.blurDataURL,
          placeholder: 'blur',
        };

        _nodes.forEach((node) => {
          Object.entries(attributes).forEach(([key, value]) => {
            const nodeAttributes = node.attributes as MdxJsxAttribute[];
            const attr = nodeAttributes.find((_attr) => _attr.name === key);

            if (attr) {
              attr.value = value;
            } else {
              nodeAttributes.push({
                type: 'mdxJsxAttribute',
                name: key,
                value,
              });
            }
          });
        });

        return Promise.resolve();
      }),
    );
  };
}
