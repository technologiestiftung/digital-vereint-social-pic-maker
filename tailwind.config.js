module.exports = {
    purge: [
        "./pages/**/*.tsx",
        "./pages/**/*.ts",
        "./components/**/*.tsx",
        "./components/**/*.ts",
        "./utils/**/*.ts",
        "./utils/**/*.tsx",
    ],
    darkMode: false,
    theme: {
        fontFamily: {
            sans: [
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                '"Noto Sans"',
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
        },
        extend: {
            colors: {
                primary: '#2F2FA2',
                secondary: '#E32239',
                tertiary: '#E24B29',
                black: '#240023'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
