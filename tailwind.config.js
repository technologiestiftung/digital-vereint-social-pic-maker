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
                "Archivo",
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
                // If you update this list please also update the colorsUtil file
                primary: '#2F2FA2',
                secondary: '#E32239',
                tertiary: '#E24B29',
                black: '#240023'
            }
        }
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [],
};
