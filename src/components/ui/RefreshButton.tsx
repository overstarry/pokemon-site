'use client';

interface RefreshButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function RefreshButton({ className, children }: RefreshButtonProps) {
  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <button 
      onClick={handleRefresh}
      className={className}
    >
      {children}
    </button>
  );
}