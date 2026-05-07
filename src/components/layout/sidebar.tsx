"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderOpen,
  ClipboardList,
  ChevronDown,
  LogOut,
  GraduationCap,
  UserCog,
  Repeat
} from 'lucide-react';

interface SidebarProps {
  role: 'admin' | 'trainer' | 'crm' | 'candidate' | 'other';
  userName?: string;
  onLogout?: () => void;
}

export function Sidebar({ role, userName = 'User', onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
      return;
    }
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout request failed:', err);
    }
    router.push('/login');
    router.refresh();
  };

  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
          { label: 'Trainers', href: '/admin/trainers', icon: GraduationCap },
          { label: 'CRM Users', href: '/admin/crm', icon: UserCog },
          { label: 'Reassign', href: '/admin/reassign', icon: Repeat },
        ];
      case 'trainer':
        return [
          { label: 'Dashboard', href: '/trainer', icon: LayoutDashboard },
          { label: 'Candidates', href: '/trainer/candidates', icon: Users },
          {
            label: 'Content',
            href: '/trainer/content',
            icon: FolderOpen,
            children: [
              { label: 'Indexes', href: '/trainer/content/indexes' },
              { label: 'Courses', href: '/trainer/content/courses' },
            ],
          },
          { label: 'Assignments', href: '/trainer/assignments', icon: ClipboardList },
        ];
      case 'crm':
        return [
          { label: 'Dashboard', href: '/crm', icon: LayoutDashboard },
          { label: 'Staff Users', href: '/crm/others', icon: Users },
          {
            label: 'Content',
            href: '/crm/content',
            icon: FolderOpen,
            children: [
              { label: 'Indexes', href: '/crm/content/indexes' },
              { label: 'Courses', href: '/crm/content/courses' },
            ],
          },
          { label: 'Assignments', href: '/crm/assignments', icon: ClipboardList },
        ];
      case 'candidate':
      case 'other':
        return [
          { label: 'My Learning', href: '/learn', icon: BookOpen },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === `/${role}` || href === '/learn' || href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-paper border-r border-rule flex flex-col z-40">
      <div className="h-16 flex items-center px-6 border-b border-rule">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-serif font-light text-[22px] tracking-[-0.02em] text-ink leading-none">
            Zytheq<span className="text-ochre">_</span>
          </span>
          <span className="font-serif font-light text-[15px] tracking-[0.01em] text-ink-mute leading-none">
            University<span className="text-ochre">_</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 overflow-y-auto">
        <div className="mb-6">
          <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-ochre px-2">
            {role} Portal
          </h4>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      'w-full group relative flex items-center justify-between px-3 py-2 text-[14.5px] font-medium transition-all duration-300',
                      isActive(item.href)
                        ? 'text-ink bg-paper-warm'
                        : 'text-ink-mute hover:bg-paper-warm hover:text-ink'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-4 h-4 transition-colors", isActive(item.href) ? "text-ochre" : "text-ink-mute group-hover:text-ink")} />
                      {item.label}
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform',
                        expandedItems.includes(item.label) && 'rotate-180'
                      )}
                    />
                    {isActive(item.href) && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-ochre" />}
                  </button>
                  {expandedItems.includes(item.label) && (
                    <ul className="mt-1 ml-9 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-3 py-1.5 text-[14px] transition-colors',
                              pathname === child.href
                                ? 'text-ochre font-medium'
                                : 'text-ink-mute hover:text-ink'
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-3 px-3 py-2 text-[14.5px] font-medium transition-all duration-300',
                    isActive(item.href)
                      ? 'text-ink bg-paper-warm'
                      : 'text-ink-mute hover:bg-paper-warm hover:text-ink'
                  )}
                >
                  <item.icon className={cn("w-4 h-4 transition-colors", isActive(item.href) ? "text-ochre" : "text-ink-mute group-hover:text-ink")} />
                  {item.label}
                  {isActive(item.href) && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-ochre" />}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-rule">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 bg-ink rounded flex items-center justify-center text-sm font-medium text-paper">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-medium text-ink truncate">{userName}</p>
            <p className="font-mono text-[10px] text-ink-mute uppercase tracking-[0.1em]">{role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-[14.5px] font-medium text-ink-mute hover:bg-paper-warm hover:text-crimson transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
