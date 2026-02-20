import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User',
  size = 'md',
  status,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const statusColors = {
    online: 'bg-msf-emerald-glow shadow-[0_0_8px_#10B981]',
    offline: 'bg-msf-mist',
    busy: 'bg-msf-creative-coral shadow-[0_0_8px_#F87171]',
    away: 'bg-msf-warning-amber shadow-[0_0_8px_#FBBF24]',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  return (
    <div className={`relative inline-block ${sizes[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover border border-white/10"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-msf-elevation-2 flex items-center justify-center text-white font-bold border border-white/10">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
      {status && (
        <div
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-msf-deep-space`}
        />
      )}
    </div>
  );
};

export interface AvatarStackProps {
  users: Array<{
    src?: string;
    alt: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
  }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  users,
  max = 4,
  size = 'md',
}) => {
  const displayedUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-3">
      {displayedUsers.map((user, index) => (
        <Avatar key={index} src={user.src} alt={user.alt} status={user.status} size={size} />
      ))}
      {remaining > 0 && (
        <div
          className={`w-8 h-8 rounded-full border-2 border-msf-deep-space bg-msf-elevation-2 flex items-center justify-center text-xs font-bold text-white`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
