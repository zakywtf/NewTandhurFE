import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'tand-appr-1': '#151E03',
        'tand-appr-2' : '#898989',
        'tand-appr-3' : '#B9B9B9',
        'tand-appr-4' : '#898989',
        'tand-appr-5' : '#BFBFBF',
        'tand-appr-6' : '#605F5F',
        'tand-1' : '#7DAB18',
        'tand-2' : '#618512',
        'tand-3' : '#DDF1B0',
        'tand-4' : '#6F9815',
        'tand-5' : '#537210',
        'tand-6' : '#D0E5A3',
        'tand-7' : '#B9D876',
        'tand-8' : '#A2CB48',
        'tand-9': '#DCEBBA',
        'tand-10' : '#87BA1A',
        'tand-11' : '#E7F2D1',
        'tand-12' : '#C5DE8D',
        'tand-13' : '#F4F4F4',
        'tand-14' : '#F3F8E8',
        'tand-error' : '#B51818',
        'tand-error-1' : '#FFE1E1',
        'tand-error-2' : '#B51818',
        'tand-success' : '#0FB700',
        'tand-success-1' : '#2CDA94',
        'tand-success-2' : '#DDFFF1',
        'tand-success-3' : '#23AD76',
        'tand-success-4' : '#18B777',
        'tand-warning' : '#FAB400',
        'tand-warning-1' : '#F3722C',
        'tand-grey-1' : '#484848',
        'tand-grey-2' : '#909090'
      },
      spacing: {
        'modal-1': '500px',
        'modal-2': '584px',
        'modal-3': '853px'
      },
      boxShadow: {
        'button': ' 0px 12px 32px rgba(0, 0, 0, 0.16)',
        'main-1' : '0px 0px 32px rgba(0, 0, 0, 0.13)',
        'main-2' : '0px 0px 32px rgba(0, 0, 0, 0.1)',
        'main-3' : '0px 12px 32px rgba(0, 0, 0, 0.07)',
        'main-4' : '0px 8px 48px rgba(0, 0, 0, 0.08)',
        'sidebar' : '-2px 0px 40px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
};
export default config;
