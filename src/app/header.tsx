'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuProps = {
  children: React.ReactNode;
  className: string;
};
const Menu = ({ children, ...rest }: MenuProps) => (
  <div {...rest}>{children}</div>
);

type MenuItemProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};
const MenuItem = ({ children, ...rest }: MenuItemProps) => (
  <Link className="p-2" {...rest}>
    {children}
  </Link>
);

export default function Header({ siteTitle }: { siteTitle: string }) {
  const pathname = usePathname();
  const Title = pathname === '/' ? 'h1' : 'div';
  return (
    <header className="flex flex-col h-auto mb-6 bg-teal-800">
      <div className="m-0 p-4 text-center">
        <Title className="w-full m-0 text-3xl tracking-widest">
          <Link href="/" className="text-slate-50 no-underline">
            {siteTitle}
          </Link>
        </Title>
      </div>
      <Menu className="pb-2 text-slate-50 text-center">
        <MenuItem href="/about">About</MenuItem>
        <MenuItem href="/blog">Blog</MenuItem>
      </Menu>
    </header>
  );
}
