const cohort = "2310-fsa-et-web-pt-sf-b-eldwin"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`

const state = {
    events : [],
    
};

const $eventList = document.querySelector('#events')
const $eventForm = document.querySelector('#addEvent')
$eventForm.addEventListener('submit', addEvent())


async function getEvents() {
    const response = await fetch(API_URL);
    const responseJSON = await response.json();
    state.events = [...state.events, ...responseJSON.data]
    console.log(state.events)
    return state.events
}


async function renderEvents(){
    const display = state.events.map(event => {
    const displayEvent = document.createElement('li')
    displayEvent.innerHTML = `
    <h3>${event.name}</h3>
    <p>

    description: ${event.description} 
    </p>
    `
    return displayEvent
        });
        $eventList.replaceChildren(...display)
}

async function render() {
    await getEvents();
    renderEvents();
}

render();

async function addEvent(e){
    e.preventDefault();

    const formData = new FormData($eventForm);
    const date = event.date.value.toISOString();

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: $eventForm.name.value,
                location: $eventForm.location.value,
                description: $eventForm.description.value,
                date: date

                

            })
    })
}
