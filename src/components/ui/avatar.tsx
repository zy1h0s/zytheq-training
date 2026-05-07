import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-12 h-12 text-[15px]',
    xl: 'w-16 h-16 text-[18px]',
  };

  const pixelSizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className={cn('object-cover border border-rule', sizes[size], className)}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center font-mono uppercase tracking-[0.1em] font-medium bg-ink text-paper',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
