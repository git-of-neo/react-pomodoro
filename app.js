// based template from https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605
'use strict';

const e = React.createElement;
const profiles = {
    "working" : 25*60,
    "break" : 5*60
}

function App() {
    const [time, setTime] = React.useState(profiles["working"]) // 25m5s
    const [paused, setPaused] = React.useState(true)
    const [profile, setProfile] = React.useState("working")
    
    React.useEffect(() => {
        const timer = setInterval(()=>{
            if (time>0 && !paused) setTime(time-1)
        },1000)

        return () => clearInterval(timer)
    }, [time, paused])

    const startTimer = () => {
        setPaused(!paused)
    }

    const changeProfile = (newProfile) => {
        if (newProfile!=profile){
            setProfile(newProfile)
            setTime(profiles[newProfile])
            setPaused(true)
        }
    }

    const button = e(
        'button',
        {"onClick":()=>{startTimer()}}, 
        paused?'Start':'Pause'
    )

    const display = e(
        'h1',
        null,
        `${Math.floor(time/60)}:${String(time%60).padStart(2,'0')}`
    )

    const profileBar = e("div", null, 
        e("button", {"class":"profileBtn", "onClick":()=>{changeProfile("working")}}, 'Pomodoro'),
        e("button", {"class":"profileBtn", "onClick":()=>{changeProfile("break")}}, 'Break')
    )

    return e('div', null, profileBar, display, button)
}

const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));