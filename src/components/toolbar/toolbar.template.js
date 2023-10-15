function toButton(button) {
    const meta = `data-type="button"
    data-value='${JSON.stringify(button.value)}'`
    const active = (button.active) ? 'active' : ''
    return `<div class="button ${active}" ${meta}>
        <i class="material-icons" ${meta}>${button.icon}</i>
    </div>`
}

export function createToolbar(state) {


    const buttons = [
        {
            icon: 'format_align_left',
            active: (state) ? state['textAlign'] === 'left' : true,
            value: {textAlign: (state && state['textAlign'] === 'left') ? 'left' : 'left'},
        },
        {
            icon: 'format_align_center',
            active: (state) ? state['textAlign'] === 'center' : false,
            value: {textAlign: (state && state['textAlign'] === 'center') ? 'left' : 'center'},
        },
        {
            icon: 'format_align_right',
            active: (state) ? state['textAlign'] === 'right' : false,
            value: {textAlign: (state && state['textAlign'] === 'right') ? 'left' : 'right'},
        },
        {
            icon: 'format_bold',
            active: (state) ? state['fontWeight'] === 'bold' : false,
            value: {fontWeight: (state && state['fontWeight'] === 'bold') ? 'normal' : 'bold'},
        },
        {
            icon: 'format_italic',
            active: (state) ? state['fontStyle'] === 'italic' : false,
            value: {fontStyle: (state && state['fontStyle'] === 'italic') ? 'normal' : 'italic'},
        },
        {
            icon: 'format_underlined',
            active: (state) ? state['textDecoration'] === 'underline' : false,
            value: {textDecoration: (state && state['textDecoration'] === 'underline') ? 'none' : 'underline'},
        },
    ]

    return buttons.map(toButton).join('')
}
