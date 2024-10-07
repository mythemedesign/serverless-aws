import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export let theme = createTheme( {
    typography: {
        fontFamily: ["Montserrat"].join(","),
        h1: {
            fontWeight: 800,
            fontSize: "58px",
            lineHeight: 2,
            letterSpacing: "0.2px"
        },
        h2: {
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: 1,
            letterSpacing: "0.2px"
        },
        h3: {
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: 1,
            letterSpacing: "0.1px"
        },
        h4: {
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: 2,
            letterSpacing: "0.2px"
        },
        h5: {
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: 1,
            letterSpacing: "0.1px"
        },
        h6: {
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: 1,
            letterSpacing: "0.2px"
        },
        button: {
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: 2,
            letterSpacing: "0.2px"
        }
     },
     palette: {
        primary:  {
         main: "#23856D",
         light: "#47AD97",
         dark:"#17213C"
        },
        error: {
            main: "#B73225"
        }
     }
   
});
theme = responsiveFontSizes(theme);


