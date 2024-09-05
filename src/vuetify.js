import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
    defaults: {
        global: {
          ripple: false,
        },
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#ffc805',
                    accent: '#e89b51',
                    secondary: '#ffffff',
                    success: '#83af50',
                    warning: '#ffd978',
                    error: '#c13e3e',
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#ffc805',
                    accent: '#a15f20',
                    secondary: '#272727',
                    success: '#83af50',
                    warning: '#ffd978',
                    error: '#c13e3e',
                }
            },
        },
    },
})