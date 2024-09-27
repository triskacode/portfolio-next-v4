export interface Link {
  title: string;
  url: string;
}

export function getHeaderNavLinks(): Link[] {
  return [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Project',
      url: '/project',
    },
    {
      title: 'Blog',
      url: '/blog',
    },
  ];
}
