import React from "react";
import { LucideIcon } from "lucide-react";

interface NavigationLinkProps {
  href: string;
  icon?: LucideIcon;
  isActive?: boolean;
  children: React.ReactNode; // ✅ thêm dòng này
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  icon: Icon,
  isActive = false,
  children,
}) => {
  return (
    <a href={href} className="flex items-center gap-2">
      {Icon && <Icon size={18} />}
      {children}
    </a>
  );
};