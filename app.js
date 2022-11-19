// based template from https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605
'use strict';

// TODO : audio 
// TODO : timer seems to be slower

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
        {"onClick":()=>{startTimer()
        },"className":"startBtn"}, 
        paused?'Start':'Pause'
    )

    const display = e(
        'h1',
        null,
        `${Math.floor(time/60)}:${String(time%60).padStart(2,'0')}`
    )

    const profileBar = e("form", {"className":"profile-picker"}, 
        e("fieldset", null, 
            e("label", {"htmlFor":"working", "className":"profileBtn-left"}, 
                e("input", {"id":"working","type":"radio", "name":"profile", "className":"visually-hidden", "onChange":()=>{changeProfile("working")}}, null),
                e("div", null, 'Pomodoro'))
            ,
            e("label", {"htmlFor":"break", "className":"profileBtn-right"}, 
                e("input", {"id":"break", "type":"radio", "className":"visually-hidden", "name":"profile", "onChange":()=>{changeProfile("break")}}, null),
                e("div", null, 'break'))
        )
    )

    return e('div', null, profileBar, display, button)
}

const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));