import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    // event listener that will fetch and set all current events for list
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    // html display of events 
    // will route to new event form when button is clicked 
    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description} organized by {event.organizer.user.first_name} </div>
                        <div className="event__game">We will play {event.game.title}</div>
                        <div className="event__time">{event.time} on {event.date} </div>
                        <button className="edit-btn" onClick={() => {
                            history.push(`events/edit/${event.id}`)
                        }}>Edit Event</button>
                    </section>
                })
            }
        </article>
    )
}