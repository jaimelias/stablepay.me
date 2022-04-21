
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
    blue: ['deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan'],
    orange: ['amber', 'orange', 'deepOrange', 'red', 'pink',  'brown'],
    green: ['cyan', 'teal', 'green', 'lightGreen', 'lime'],
    violet: ['purple', 'deepPurple']
};

const basicColorAlike = (colorA, colorB) => {
    let output = false;

    for(let b in basicColors)
    {
        const basic = basicColors[b];

        if(basicColors[b].includes(colorA) && basicColors[b].includes(colorB))
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
const secondaryShades = ['400', '500', '600', '700', '800', '900', ...primaryShades];
const bgShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', ...primaryShades];


const getContrastLevel = ({colorAIndex, colorBIndex, shadeAIndex, shadeBIndex}) => {

    let output = 'high';
    const colorIndexDiff = colorAIndex - colorBIndex;
    const shadeIndexDiff = shadeAIndex - shadeBIndex;

    if(colorIndexDiff >= -2 && colorIndexDiff <= 2 )
    {
        if(shadeIndexDiff >= -2 && shadeIndexDiff <= 2 )
        {
            output = 'low';
        }
        else{
            output = 'medium';
        }
    }
    else if(colorIndexDiff >= 3 && colorIndexDiff <= -3 )
    {
        if(shadeIndexDiff >= -2 && shadeIndexDiff <= 2 )
        {
            output = 'medium';
        }
    }

    return output;
}

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
                const colorIndex = colorKeys.indexOf(c);
                const shadeIndex = allShades.indexOf(s);

                ColorArr.push({
                    color: c,
                    colorIndex,
                    shade: s,
                    shadeIndex,
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
                    colorAIndex: primary_color_index, 
                    colorBIndex: background_color_index, 
                    shadeAIndex: primary_shade_index, 
                    shadeBIndex: background_shade_index
                });


                if(shadeinLightMode && (primary_background_contrast === 'high' || primary_background_contrast === 'medium') && !basicColorAlike(background_color, primary_color))
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
                            colorAIndex: secondary_color_index, 
                            colorBIndex: background_color_index, 
                            shadeAIndex: secondary_shade_index, 
                            shadeBIndex: background_shade_index
                        });

                        const secondary_primary_contrast = getContrastLevel({
                            colorAIndex: secondary_color_index, 
                            colorBIndex: primary_color_index, 
                            shadeAIndex: secondary_shade_index, 
                            shadeBIndex: primary_shade_index
                        });

                        if(primary_color !== secondary_color && background_color !== secondary_color && background_shade !== secondary_shade && primary_shade !== secondary_shade && !basicColorAlike(primary_color, secondary_color) && !basicColorAlike(background_color, secondary_color))
                        {
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
    }

    console.log(`# palettes ${output.length}`);

    return output;
}