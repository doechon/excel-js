import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const type = $resizer.data.resize;

        $resizer.css({
            opacity: 1,
        })

        const sideProp = type === 'col' ? 'bottom' : 'right';

        $resizer.css({
            [sideProp]: '-5000px'
        })

        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();

        const colOrRowName = $parent.$el.textContent.trim()

        let value;
        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            if (type === 'col') {
                $parent.css({width: value + 'px'})
                $root.findAll(`[data-col='${colOrRowName}']`)
                    .forEach(x => x.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
                $root.findAll(`[data-row='${colOrRowName}']`)
                    .forEach(x => x.style.height = value + 'px')
            }

            resolve({
                value,
                id: colOrRowName,
                type: type
            })

            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })

        }
    })
}
