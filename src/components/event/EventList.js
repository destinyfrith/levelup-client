import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description} organized by {event.organizer.user.first_name} </div>
                        <div className="event__time">{event.time} on {event.date} </div>
                        <div className="event__game">We will play {event.game.title}</div>
                    </section>
                })
            }
        </article>
    )
}