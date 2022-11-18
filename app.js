// based template from https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605
'use strict';

const e = React.createElement;

function App() {
    const [time, setTime] = React.useState(25*60 + 5) // 25m5s
    
    React.useEffect(() => {
        const timer = setInterval(()=>{
            if (time>0) setTime(time-1)
        },1000)

        return () => clearInterval(timer)
    }, [time])

    const button = e(
        'button',
        {"onClick":()=>{
            countDown()
        }}, 'Start'
        )

    const display = e(
        'h1',
        null,
        `${Math.floor(time/60)}m ${time%60}s`
    )

    return e('div', null, button, display)
}

const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));