import Link from "next/link";
import React from "react";
import { LucideIcon } from "lucide-react";

interface NavigationLinkProps {
  href: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  icon: Icon,
  children,
  className,
}) => {
  return (
    <Link href={href} className={`flex items-center gap-2 ${className || ''}`}>
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );
};