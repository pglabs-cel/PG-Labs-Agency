import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-4 h-4" }) => {
  const normalized = name.toLowerCase().replace(/[\s./\-&_]/g, "");

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
    case "pythonml":
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

    case "redis":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#DC382D" />
          <path d="M2 12L12 17L22 12L12 7L2 12Z" fill="#A82820" />
          <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="#D82C20" />
        </svg>
      );

    case "prisma":
    case "databasearchitecture":
    case "database":
    case "schema":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#2DD4BF" strokeWidth="1.5" />
          <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="#2DD4BF" strokeWidth="1.5" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#2DD4BF" strokeWidth="1.5" />
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

    case "cloudplatforms":
    case "cloud":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "cicd":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="12" r="3" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="18" cy="12" r="3" stroke="#10B981" strokeWidth="1.5" />
          <path d="M9 12h6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 6a9 9 0 00-6 3m12 0a9 9 0 00-6-3m0 12a9 9 0 006-3m-12 0a9 9 0 006 3" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "linux":
    case "linuxsecurity":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    /* OFFICIAL BRAND LOGOS */
    case "shopify":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023z"
            fill="#5E8E3E"
          />
          <path
            d="M15.009 24l.927-21.166-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24z"
            fill="#95BF47"
          />
          <path
            d="M11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002z"
            fill="#5E8E3E"
          />
          <path
            d="M11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "wordpress":
    case "wp":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
          <path
            d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"
            fill="#21759B"
          />
        </svg>
      );

    case "metaads":
    case "meta":
    case "facebookads":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 00.265.86 5.297 5.297 0 00.371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 00.81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 00-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 011.088-.285z"
            fill="#0467DF"
          />
        </svg>
      );

    case "googleads":
    case "googlead":
    case "gads":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998z"
            fill="#34A853"
          />
          <path
            d="M23.4641 16.9287L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644z"
            fill="#FBBC04"
          />
          <path
            d="M7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z"
            fill="#4285F4"
          />
        </svg>
      );

    case "googleanalytics":
    case "ga4":
    case "analytics":
    case "seoanalytics":
    case "seo":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619z"
            fill="#E37400"
          />
          <path
            d="M12.0054 9.045c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z"
            fill="#F9AB00"
          />
          <path
            d="M4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726z"
            fill="#F9AB00"
          />
        </svg>
      );

    case "figma":
      return (
        <svg className={className} viewBox="0 0 38 57" fill="none">
          <path
            d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
            fill="#1ABCFE"
          />
          <path
            d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
            fill="#0ACF83"
          />
          <path
            d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
            fill="#FF7262"
          />
          <path
            d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
            fill="#F24E1E"
          />
          <path
            d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
            fill="#A259FF"
          />
        </svg>
      );

    case "tailwindcss":
    case "tailwind":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.3-1.8 4-1.3 1 .3 1.7 1 2.5 1.8 1.3 1.3 2.8 2.5 5.5 2.5 2.7 0 4.3-1.3 5-4-1 1.3-2.3 1.8-4 1.3-1-.3-1.7-1-2.5-1.8C16.2 7.2 14.7 6 12 6zM5 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.3-1.8 4-1.3 1 .3 1.7 1 2.5 1.8C7.8 17.8 9.3 19 12 19c2.7 0 4.3-1.3 5-4-1 1.3-2.3 1.8-4 1.3-1-.3-1.7-1-2.5-1.8C9.2 13.2 7.7 12 5 12z"
            fill="#38BDF8"
          />
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

    case "computervision":
    case "vision":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#8B5CF6" />
        </svg>
      );

    case "machinelearning":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="6" r="3" stroke="#A78BFA" strokeWidth="1.5" />
          <circle cx="18" cy="6" r="3" stroke="#A78BFA" strokeWidth="1.5" />
          <circle cx="12" cy="18" r="3" stroke="#A78BFA" strokeWidth="1.5" />
          <path d="M8.5 7.5L15.5 7.5M7.5 8.5L10.5 15.5M16.5 8.5L13.5 15.5" stroke="#71717A" strokeWidth="1.2" />
        </svg>
      );

    case "llmapis":
    case "llm":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#8B5CF6" />
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
