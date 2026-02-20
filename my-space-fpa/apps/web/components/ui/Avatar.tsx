import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  showStatus?: boolean;
  className?: string;
}

export default function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  status,
  showStatus = false,
  className = ''
}: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const statusColors = {
    online: 'bg-msf-emerald-glow',
    offline: 'bg-msf-mist',
    busy: 'bg-msf-creative-coral',
    away: 'bg-msf-warning-amber'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeStyles[size]} rounded-full object-cover border-2 border-white/10`}
        />
      ) : (
        <div className={`${sizeStyles[size]} rounded-full bg-msf-elevation-2 flex items-center justify-center border-2 border-white/10`}>
          <span className="text-white font-semibold">
            {alt?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
      )}
      
      {showStatus && status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[status]} rounded-full border-2 border-msf-deep-space shadow-[0_0_8px_currentColor]`}
        />
      )}
    </div>
  );
}

interface AvatarStackProps {
  users: Array<{
    id: string;
    name: string;
    avatar?: string;
    active?: boolean;
  }>;
  max?: number;
  className?: string;
}

export function AvatarStack({ users, max = 4, className = '' }: AvatarStackProps) {
  const displayedUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className={`flex -space-x-3 ${className}`}>
      {displayedUsers.map((user) => (
        <Avatar
          key={user.id}
          src={user.avatar}
          alt={user.name}
          size="md"
          showStatus={user.active}
          status={user.active ? 'online' : 'offline'}
          className="ring-2 ring-msf-deep-space transition-transform hover:z-10 hover:scale-110"
        />
      ))}
      {remainingCount > 0 && (
        <div className="w-10 h-10 rounded-full bg-msf-elevation-2 flex items-center justify-center text-xs font-medium text-white ring-2 ring-msf-deep-space">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
