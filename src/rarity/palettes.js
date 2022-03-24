
import * as Colors from '@mui/material/colors';

const filterBgShades = palettes => palettes.filter(p => bgShades.includes(p.shade));
const filterPrimaryShades = palettes => palettes.filter(p => primaryShades.includes(p.shade));
const filterSecondaryShades = palettes => palettes.filter(p => secondaryShades.includes(p.shade));

const ValidColors = Colors;
const modes = ['light', 'dark'];
const allShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];

const excludeFromLightMode = {
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
    yellow: allShades,
    amber: allShades,
    orange: ['50', '100', '200', '300', '400', '500', '600', '700', 'A100', 'A200', 'A400', 'A700'],
    deepOrange: ['50', '100', '200', '300', '400', 'A100', 'A200'],
    brown: ['50', '100', '200', 'A100', 'A200'],
    grey: ['50', '100', '200', '300', '400', '500', 'A100', 'A200', 'A400'],
    blueGrey: ['50', '100', '200', '300', 'A100', 'A200']
}


export const isShadeInLightMode = ({mode, color, shade}) => {

    let output = true;

    if(mode === 'light' || !mode)
    {
        if(excludeFromLightMode[color].includes(shade))
        {
            output = false;
        }
    }

    return output;
};

const primaryShades = ['A100', 'A200', 'A400', 'A700'];
const secondaryShades = ['400', '500', '600', '700', '800', '900', ...primaryShades];
const bgShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', ...primaryShades];


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
                const shadeInLightMode = isShadeInLightMode({mode: '', color: c, shade: s});
                const contrastText = (shadeInLightMode) ? '#fff' : '#000';

                ColorArr.push({
                    color: c,
                    shade: s,
                    contrastText
                });
            }
        }
    }
    
    return ColorArr;
}

export const generateMetadata = () => {

    let output = [];
    const palettes = getPalettes();

    //bg
    const validBgShades = filterBgShades(palettes);
    const validBgShadessLength = validBgShades.length;

    //primary
    const validPrimaryShades = filterPrimaryShades(palettes);
    const validPrimaryShadesLength = validPrimaryShades.length;

    //secondary
    const validSecondaryShades = filterSecondaryShades(palettes);
    const validSecondaryShadesLength = validSecondaryShades.length;

    for(let m = 0; m < 2; m++)
    {
        const mode = modes[m];

        for(let bg = 0; bg < validBgShadessLength; bg++)
        {
            const background = validBgShades[bg];
            const background_color = background.color;
            const background_shade = background.shade;

            for(let pr = 0; pr < validPrimaryShadesLength; pr++)
            {
                const primary = validPrimaryShades[pr];
                const primary_color = primary.color;
                const primary_shade = primary.shade;
                const primary_contrast_text = primary.contrastText;
                const shadeinLightMode = isShadeInLightMode({mode, shade: primary_shade, color: primary_color});

                if(background_color !== primary_color && background_shade !== primary_shade && shadeinLightMode)
                {
                    for(let se = 0; se < validSecondaryShadesLength; se++)
                    {
                        const secondary = validSecondaryShades[se];
                        const secondary_color = secondary.color;
                        const secondary_shade = secondary.shade; 
                        const secondary_contrast_text = secondary.contrastText;                       

                        if(primary_color !== secondary_color && background_color !== secondary_color && background_shade !== secondary_shade && primary_shade !== secondary_shade)
                        {
                            output.push({
                                mode, 
                                background_color, 
                                background_shade,
                                primary_color, 
                                primary_shade,
                                primary_contrast_text,
                                secondary_color, 
                                secondary_shade,
                                secondary_contrast_text
                            });
                        }
                    }
                }
            }
        }
    }

    console.log(`# palettes ${output.length}`);

    return output;
}