'use client';

import { type Post } from '#site/content';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface ShareButtonProps extends ButtonProps {
  post: Post;
}

export function ShareButton({
  post,
  ...props
}: ShareButtonProps): React.JSX.Element {
  const handleShare = async (): Promise<void> => {
    try {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // User cancelled the share operation
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => void handleShare()}
      {...props}
    >
      <Icon.Lucide name="share-2" className="size-4" />
    </Button>
  );
}

export function ScrollToTopButton(props: ButtonProps): React.JSX.Element {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={scrollToTop} {...props}>
      <Icon.Lucide name="arrow-up" className="size-4" />
    </Button>
  );
}
