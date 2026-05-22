interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'option';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'w-full rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-violet-600 text-white py-4 text-lg hover:bg-violet-700 active:scale-95 focus-visible:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-white border-2 border-violet-600 text-violet-600 py-4 text-lg hover:bg-violet-50 active:scale-95 focus-visible:ring-violet-500',
    option:
      'bg-white border-2 border-gray-200 text-gray-700 py-5 text-base text-left px-6 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 active:scale-95 focus-visible:ring-violet-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
