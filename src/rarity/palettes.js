
import * as Colors from '@mui/material/colors';
import {shadeHexColor} from '../utilities/utilities'


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


const ValidColors = Colors;


export const getPalettes = () => {
    let colorRanges = [];
    let primarySecondary = [];

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
                let mode = 'dark';
                const hex = shades[s];
                let light = shadeHexColor({color: hex, percent: 20});
                let dark =  shadeHexColor({color: hex, percent: -20});

                if(bgWithDarkText[c].includes(s))
                {
                    mode = 'light';
                }

                const divider = (mode === light) ? dark : light;


                ColorArr.push({
                    mode,
                    colors: {
                        values: {
                            main: hex,
                            light,
                            dark
                        },
                        color: c,
                        shade: s,
                        divider,
                        constrast: (mode === 'light') ? '#000' : '#fff'
                    }
                });
            }
        }
    }





    return ColorArr;
    
    for(let secondaryColors in ValidColors)
    {
        const secondaryShades = ValidColors[secondaryColors];

        for(let sShades in secondaryShades)
        {
            const secondary = secondaryShades[sShades];

            //PRIMARY
            for(let primaryColors in ValidColors)
            {
                if(secondaryColors !== primaryColors)
                {
                    const primaryShades = ValidColors[primaryColors];
                
                    for(let pShades in primaryShades)
                    {
                        const primary = primaryShades[pShades];

                        primarySecondary.push({primary, secondary});
                    }
                }
            }                
        }
    }


    const flatColorRangesLength = colorRanges.length;

    let output = primarySecondary.map(o => {
        const {primary, secondary} = o;
        let randomPaper = Math.floor(Math.random() * flatColorRangesLength);
        let randomBackground = Math.floor(Math.random() * flatColorRangesLength);

        let paper = colorRanges[randomPaper];
        let background = colorRanges[randomBackground];

        if(paper === primary || paper === secondary)
        {
            randomPaper = Math.floor(Math.random() * flatColorRangesLength);
            paper = colorRanges[randomPaper];
        }

        if(background === primary || background === secondary || background === paper)
        {
            randomBackground = Math.floor(Math.random() * flatColorRangesLength);
            background = colorRanges[randomBackground];
        }

        return {...o, paper, background}
    });



    return output;
}

