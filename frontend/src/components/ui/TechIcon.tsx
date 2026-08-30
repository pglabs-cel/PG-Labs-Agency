import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-4 h-4" }) => {
  const normalized = name.toLowerCase().replace(/[\s./-]/g, "");

  switch (normalized) {
    case "react":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(60 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(120 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case "nextjs":
    case "next":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#000" stroke="#FAFAFA" strokeWidth="1" />
          <path
            d="M8 8V16M15 8V16M8 8L16 16"
            stroke="#FAFAFA"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "nodejs":
    case "node":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
            fill="#339933"
            opacity="0.2"
          />
          <path
            d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
            stroke="#5FA04E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 7V17M8 9.5L12 7L16 9.5"
            stroke="#FAFAFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "python":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M11.9 2C8.7 2 6.8 3.4 6.8 5.6V7.4H12.3V8.3H4.4C2.3 8.3 1 9.8 1 12.3C1 15 2.5 16.1 4.7 16.1H6.1V14.2C6.1 12 7.7 10.3 10 10.3H14.1C15.8 10.3 17.2 8.9 17.2 7.1V4.9C17.2 3.1 15.3 2 11.9 2ZM9.5 4.3C10.1 4.3 10.6 4.8 10.6 5.4C10.6 6 10.1 6.5 9.5 6.5C8.9 6.5 8.4 6 8.4 5.4C8.4 4.8 8.9 4.3 9.5 4.3Z"
            fill="#387EB8"
          />
          <path
            d="M12.1 22C15.3 22 17.2 20.6 17.2 18.4V16.6H11.7V15.7H19.6C21.7 15.7 23 14.2 23 11.7C23 9 21.5 7.9 19.3 7.9H17.9V9.8C17.9 12 16.3 13.7 14 13.7H9.9C8.2 13.7 6.8 15.1 6.8 16.9V19.1C6.8 20.9 8.7 22 12.1 22ZM14.5 19.7C13.9 19.7 13.4 19.2 13.4 18.6C13.4 18 13.9 17.5 14.5 17.5C15.1 17.5 15.6 18 15.6 18.6C15.6 19.2 15.1 19.7 14.5 19.7Z"
            fill="#FFE873"
          />
        </svg>
      );

    case "fastapi":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10.5" fill="#05998B" />
          <path
            d="M13.2 4.5L7 13.2H12L10.8 19.5L17 10.8H12L13.2 4.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "mongodb":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M11.9 1.5C11.9 1.5 6.5 7.2 6.5 13.4C6.5 18.4 9.8 21.6 11.9 22.5C14 21.6 17.3 18.4 17.3 13.4C17.3 7.2 11.9 1.5 11.9 1.5Z"
            fill="#47A248"
            opacity="0.3"
          />
          <path
            d="M12 2C12 2 7 7.5 7 13.5C7 18.5 10.2 21.5 12 22.3V2Z"
            fill="#47A248"
          />
          <path
            d="M12 2C12 2 17 7.5 17 13.5C17 18.5 13.8 21.5 12 22.3V2Z"
            fill="#499D4A"
          />
          <path
            d="M12 1.5V22.5"
            stroke="#FAFAFA"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "postgresql":
    case "postgres":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
            fill="#336791"
            opacity="0.2"
          />
          <path
            d="M16.5 10C16.5 7.5 14.5 5.5 12 5.5C9.5 5.5 7.5 7.5 7.5 10C7.5 12.2 9 14 11 14.4V18H13V14.4C15 14 16.5 12.2 16.5 10Z"
            stroke="#4169E1"
            strokeWidth="1.5"
          />
          <path
            d="M8.5 9.5C8.5 9.5 10 11.5 12 11.5C14 11.5 15.5 9.5 15.5 9.5"
            stroke="#4169E1"
            strokeWidth="1.2"
          />
        </svg>
      );

    case "docker":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M2.5 13C2.5 17.4 6 21 11.5 21C17.5 21 21.5 16.5 21.5 12C21.5 11.5 20.8 10.9 20 11.1C18.6 11.5 17 11.2 16.3 9.8C16.1 9.5 15.9 9.3 15.7 9H9.5V13H2.5Z"
            fill="#2496ED"
            opacity="0.3"
          />
          <path
            d="M1.5 13C3.5 13 4.5 11 7 11C9.5 11 10.5 13 13 13C15.5 13 16.5 11 19 11C20.5 11 21.5 12 22.5 12.5"
            stroke="#2496ED"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="5.5" y="7" width="2.5" height="2.5" fill="#2496ED" rx="0.5" />
          <rect x="8.5" y="7" width="2.5" height="2.5" fill="#2496ED" rx="0.5" />
          <rect x="11.5" y="7" width="2.5" height="2.5" fill="#2496ED" rx="0.5" />
          <rect x="8.5" y="4" width="2.5" height="2.5" fill="#2496ED" rx="0.5" />
        </svg>
      );

    case "restapis":
    case "api":
    case "apis":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="12" r="3" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="18" cy="6" r="3" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="3" stroke="#06B6D4" strokeWidth="1.5" />
          <path d="M8.5 10.5L15.5 7.5M8.5 13.5L15.5 16.5" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "aiml":
    case "ai":
    case "ml":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="1.5" fill="#8B5CF6" />
          <circle cx="15" cy="9" r="1.5" fill="#8B5CF6" />
          <circle cx="12" cy="15" r="1.5" fill="#A78BFA" />
          <path d="M9 9L12 15L15 9" stroke="#A78BFA" strokeWidth="1.2" />
          <path d="M12 1V4M12 20V23M1 12H4M20 12H23" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "modernjavascript":
    case "javascript":
    case "js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
          <path
            d="M8 15C8.5 16.2 9.5 17 10.5 17C11.5 17 12 16.3 12 15V9"
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M14 15.5C14.5 16.5 15.5 17 17 17C18.5 17 19.5 16.2 19.5 15C19.5 13.5 18.5 13 16.5 12.5C14.5 12 13.5 11.2 13.5 9.8C13.5 8.5 14.8 7.5 16.5 7.5C18 7.5 19 8.2 19.5 9.2"
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
          <path
            d="M5 9H11M8 9V17"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13 15.5C13.5 16.5 14.5 17 16 17C17.5 17 18.5 16.2 18.5 15C18.5 13.5 17.5 13 15.5 12.5C13.5 12 12.5 11.2 12.5 9.8C12.5 8.5 13.8 7.5 15.5 7.5C17 7.5 18 8.2 18.5 9.2"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "express":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10.5" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
          <path
            d="M6 16L11 8M11 16L6 8M14 12H19M14 8H18.5C19 8 19.5 8.5 19.5 9.5C19.5 10.5 19 11 18 11.5M14 16H19"
            stroke="#FAFAFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "framermotion":
    case "framer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 2H20V9H12L4 2Z" fill="#8B5CF6" />
          <path d="M4 9H12V16H4V9Z" fill="#A78BFA" />
          <path d="M12 16L4 23V16H12Z" fill="#7C3AED" />
        </svg>
      );

    default:
      return (
        <span className="w-2 h-2 rounded-full bg-accent/60 shrink-0" aria-hidden="true" />
      );
  }
};
