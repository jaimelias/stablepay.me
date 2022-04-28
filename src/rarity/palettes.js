
import * as Colors from '@mui/material/colors';

const filterBgShades = palettes => palettes.filter(p => bgShades.includes(p.shade));
const filterPrimaryShades = palettes => palettes.filter(p => primaryShades.includes(p.shade));
const filterSecondaryShades = palettes => palettes.filter(p => secondaryShades.includes(p.shade));
const ValidColors = Colors;

const modes = ['light', 'dark'];
const allShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
const colorKeys = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'grey', 'blueGrey'];

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

const basicColors = {
    red: ['red', 'pink', 'deepOrange'],
    yellow: ['lime', 'yellow', 'amber', 'orange'],
    blue: ['purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal'],
    orange: ['amber', 'orange', 'deepOrange', 'red', 'pink',  'brown'],
    green: ['cyan', 'teal', 'green', 'lightGreen', 'lime']
};

const basicColorAlike = (colorA, colorB) => {
    let output = false;

    for(let b in basicColors)
    {
        const basic = basicColors[b];

        if(basic.includes(colorA) && basic.includes(colorB))
        {
            output = true;
        }
    }

    return output;
};


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
const secondaryShades = ['400', '500', '600', ...primaryShades];
const bgShades = ['50', '100', '200', '300', '400', '500', '600', ...primaryShades];


const getContrastLevel = ({colorA, shadeAIndex, colorB, shadeBIndex}) => {

    let output = 'high';

    const shadeIndexDiff = shadeAIndex - shadeBIndex;
    const colorsAlike = basicColorAlike(colorA, colorB);

    if(shadeIndexDiff >= -3 && shadeIndexDiff <= 3)
    {
        output = 'low';
    }

    if(colorsAlike && shadeIndexDiff >= -5 && shadeIndexDiff <= 5)
    {
        output = 'low';
    }

    return output;
}

export const getPalettes = () => {
    let colorRanges = [];
    const colorArr = [];

    for(let c in ValidColors)
    {
        const shades = ValidColors[c];

        for(let s in shades)
        {
            colorRanges.push(shades[s]);
        }
    }
    
    for(let c in ValidColors)
    {
        const shades = ValidColors[c];

        if(c !== 'grey' && c !== 'common')
        {
            for(let s in shades)
            {
                const shadeInLightMode = isShadeInLightMode({mode: '', color: c, shade: s});
                const contrastText = (shadeInLightMode) ? '#fff' : '#000';
                const colorIndex = colorKeys.indexOf(c);
                const shadeIndex = allShades.indexOf(s);

                colorArr.push({
                    color: c,
                    colorIndex,
                    shade: s,
                    shadeIndex,
                    contrastText
                });
            }
        }
    }
    
    return colorArr;
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
            const background_color_index = background.colorIndex;
            const background_shade = background.shade;
            const background_shade_index = background.shadeIndex;

            for(let pr = 0; pr < validPrimaryShadesLength; pr++)
            {
                const primary = validPrimaryShades[pr];
                const primary_color = primary.color;
                const primary_color_index = primary.colorIndex;
                const primary_shade = primary.shade;
                const primary_shade_index = primary.shadeIndex;
                const primary_contrast_text = primary.contrastText;
                const shadeinLightMode = isShadeInLightMode({mode, shade: primary_shade, color: primary_color});

                const primary_background_contrast  = getContrastLevel({
                    colorA: primary_color,
                    shadeAIndex: primary_shade_index,
                    colorB: background_color,
                    shadeBIndex: background_shade_index
                });

                if(shadeinLightMode && primary_background_contrast === 'high')
                {
                    for(let se = 0; se < validSecondaryShadesLength; se++)
                    {
                        const secondary = validSecondaryShades[se];
                        const secondary_color = secondary.color;
                        const secondary_color_index = secondary.colorIndex;
                        const secondary_shade = secondary.shade; 
                        const secondary_shade_index = secondary.shadeIndex; 
                        const secondary_contrast_text = secondary.contrastText;
                        
                        const secondary_background_contrast = getContrastLevel({
                            colorA: secondary_color,
                            shadeAIndex: secondary_shade_index, 
                            colorB: background_color,
                            shadeBIndex: background_shade_index,
                        });

                        const secondary_primary_contrast = getContrastLevel({
                            colorA: secondary_color,
                            shadeAIndex: secondary_shade_index,
                            colorB: primary_color,
                            shadeBIndex: primary_shade_index,
                        });

                        if(secondary_background_contrast === 'high' && secondary_primary_contrast === 'high')
                        {
                            output.push({
                                mode, 
                                background_color,
                                background_color_index,
                                background_shade,
                                background_shade_index,
                                primary_color,
                                primary_color_index,
                                primary_shade,
                                primary_shade_index,
                                primary_contrast_text,
                                secondary_color,
                                secondary_color_index,
                                secondary_shade,
                                secondary_shade_index,
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