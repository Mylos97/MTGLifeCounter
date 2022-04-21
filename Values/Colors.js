import { getData } from './Storage';

var index = 0  
const colors = {0:{primary:'rgb(59,24,95)', secondary:'rgb(254,194,96)', tertiary: 'rgb(42, 9, 68)'},
                1:{primary:'rgb(249, 72, 146)', secondary:'rgb(251, 229, 229)', tertiary:'rgb(255, 161, 201)'},
                2:{primary:'rgb(223, 223, 222)', secondary:'rgb(141, 141, 170)', tertiary:'rgb(247, 245, 242)'},
                3:{primary:'rgb(212, 64, 0)', secondary:'rgb(247, 233, 215)', tertiary:'rgb(255, 122, 0)'}}

export const getColors = async () => {
    await getData().then(e => {
        index = e.index
    })
}

export const updateIndex = (i) => {
    index = i
}

export const getTheme = () => {
    return colors[index]
}

export const COLORS = {
    white: 'rgb(255,253,215)',
    green: 'rgb(155,211,174)',
    red: '#e63946',
    black: 'rgb(222,214,214)',
    blue: 'rgb(169,224,249)',
    colorPrimary:colors[index].primary,
    colorSecondary:colors[index].secondary,
    colorTertiary: colors[index].tertiary,
    btnAdd: '#aaf683',
    btnRemove: '#ee6055',
    btnSecondary: '#EAF4F4',
    fontColor: '#7f8080',
}