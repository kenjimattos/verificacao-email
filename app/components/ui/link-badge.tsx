import { ReactNode } from 'react';
import Link from "next/link";

type LinkProps = {
  children: ReactNode;
  href: string;
  external?: boolean;
};

export function LinkBadge({ children, href, external = false }: LinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link href={href}>{children}</Link>;
}
