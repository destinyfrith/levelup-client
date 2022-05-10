import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "./EventManager.js"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    // event listener that will fetch and set all current events for list
    const eventsState = () => {
        getEvents()
            .then((data) => {
                setEvents(data)
            })
    }

    useEffect(() => {
        eventsState()
    }, [])

    // delete event listener
    const onClickDelete = (eventId) => {
        deleteEvent(eventId).then((data) => {
            eventsState(data)
        })
    }

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
                        {
                            event.joined ?
                                <button className="leave-btn" onClick={() => { leaveEvent(event.id).then(res => setEvents(res)) }}>Leave Event</button>
                                :
                                <button className="join-btn" onClick={() => { joinEvent(event.id).then(res => setEvents(res)) }}>Join Event</button>
                        }

                        <button className="edit-btn" onClick={() => {
                            history.push(`events/edit/${event.id}`)
                        }}>Edit Event</button>
                        <button className="delete-btn" onClick={() => { onClickDelete(event.id) }}>Delete Event</button>
                    </section>
                })
            }
        </article>
    )
}