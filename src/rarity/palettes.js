
import * as Colors from '@mui/material/colors';
import {shadeHexColor} from '../utilities/utilities'

const filterBgShades = palettes => palettes.filter(p => bgShades.includes(p.shade));
const filterActionShades = palettes => palettes.filter(p => actionShades.includes(p.shade));

const modes = ['light', 'dark'];

const bgWithDarkText = {
    red: ['50', '100', '200', '300', 'A100'],
    pink: ['50', '100', '200', 'A100'],
    purple: ['50', '100', '200', 'A100'],
    deepPurple: ['50', '100', '200', 'A100'],
    indigo: ['50', '100', '200', 'A100'],
    blue: ['50', '100', '200', '300', '400', 'A100'],
    lightBlue: ['50', '100', '200', '300', '400', '500', 'A100', 'A200', 'A400'],
    cyan: ['50', '100', '200', '300', '400', '500', '600', 'A100', 'A200', 'A400', 'A700'],
    teal: ['50', '100', '200', '300', 'A100', 'A200', 'A400', 'A700'],
    green: ['50', '100', '200', '300', '400', '500', 'A100', 'A200', 'A400', 'A700'],
    lightGreen: ['50', '100', '200', '300', '400', '500', '600', 'A100', 'A200', 'A400', 'A700'],
    lime: ['50', '100', '200', '300', '400', '500', '600', '700', '800', 'A100', 'A200', 'A400', 'A700'],
    yellow: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'],
    amber: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'],
    orange: ['50', '100', '200', '300', '400', '500', '600', '700', 'A100', 'A200', 'A400', 'A700'],
    deepOrange: ['50', '100', '200', '300', '400', 'A100', 'A200'],
    brown: ['50', '100', '200', 'A100', 'A200'],
    grey: ['50', '100', '200', '300', '400', '500', 'A100', 'A200', 'A400'],
    blueGrey: ['50', '100', '200', '300', 'A100', 'A200']
}

const actionShades = ['A100', 'A200', 'A400', 'A700'];
const bgShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];


const ValidColors = Colors;


export const getPalettes = () => {
    let colorRanges = [];

    for(let c in ValidColors)
    {
        const shades = ValidColors[c];

        for(let s in shades)
        {
            colorRanges.push(shades[s]);
        }
    }


    const ColorArr = [];

    for(let c in ValidColors)
    {
        const shades = ValidColors[c];

        if(c !== 'grey' && c !== 'common')
        {
            for(let s in shades)
            {
                ColorArr.push({
                    color: c,
                    shade: s
                });
            }
        }
    }
    
    return ColorArr;
}

export const generateMetadata = () => {

    let output = [];
    const palettes = getPalettes();
    const validBgShades = filterBgShades(palettes);
    const validBgShadessLength = validBgShades.length;
    const validActionShades = filterActionShades(palettes);
    const validActionShadesLength = validActionShades.length;

    for(let m = 0; m < 2; m++)
    {
        const mode = modes[m];

        for(let bg = 0; bg < validBgShadessLength; bg++)
        {
            const background = validBgShades[bg];
            const background_color = background.color;
            const background_shade = background.shade;

            for(let pr = 0; pr < validActionShadesLength; pr++)
            {
                const primary = validActionShades[pr];
                const primary_color = primary.color;
                const primary_shade = primary.shade;

                if(background_color !== primary_color)
                {

                    for(let se = 0; se < validActionShadesLength; se++)
                    {
                        const secondary = validActionShades[se];
                        const secondary_color = secondary.color;
                        const secondary_shade = secondary.shade;

                        if(primary_color !== secondary_color && background_color !== secondary_color)
                        {
                            output.push({mode, background_color, background_shade, primary_color, primary_shade, secondary_color, secondary_shade});
                        }
                    }
                }
            }
        }
    }

    return output;
}