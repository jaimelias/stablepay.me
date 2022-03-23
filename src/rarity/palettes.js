
import { OutputSharp } from '@mui/icons-material';
import * as Colors from '@mui/material/colors';

const lightColorRanges = ['100', '200', '300', '400'];
const darkColorRanges = ['500', '600', '700', '800', '900'];
const brightColorRanges = ['A100', 'A200', 'A400', 'A700'];

const ValidColors = {red: Colors.red, pink: Colors.pink, yellow: Colors.yellow};


export const getPalettes = () => {
    let colorRanges = {light: [], dark: [], bright: []};
    let primarySecondary = [];

    for(let c in Colors)
    {
        const shades = Colors[c];

        for(let s in shades)
        {
            const hex = shades[s]
            
            if(lightColorRanges.includes(s))
            {
                colorRanges.light.push(hex);
            }
            if(darkColorRanges.includes(s))
            {
                colorRanges.dark.push(hex);
            }
            if(brightColorRanges.includes(s))
            {
                colorRanges.bright.push(hex);
            }
        }
    }
    
    
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

    const {light, dark, bright} = colorRanges;
    const flatColorRanges = [...light, ...dark, ...bright];
    const flatColorRangesLength = flatColorRanges.length;

    let output = primarySecondary.map(o => {
        const {primary, secondary} = o;
        let randomPaper = Math.floor(Math.random() * flatColorRangesLength);
        let randomBackground = Math.floor(Math.random() * flatColorRangesLength);

        let paper = flatColorRanges[randomPaper];
        let background = flatColorRanges[randomBackground];

        if(paper === primary || paper === secondary)
        {
            randomPaper = Math.floor(Math.random() * flatColorRangesLength);
            paper = flatColorRanges[randomPaper];
        }

        if(background === primary || background === secondary || background === paper)
        {
            randomBackground = Math.floor(Math.random() * flatColorRangesLength);
            background = flatColorRanges[randomBackground];
        }

        return {...o, paper, background}
    });



    return output;
}

