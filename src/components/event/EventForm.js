import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager"
import { createEvent } from "./EventManager"

// create the event form function
export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    // set initial state of an event with everything null
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: "",
        organizer: 0
    })

    // this event grabs current games and sets them so that a game can be selected from menu
    useEffect(()=>{
        getGames().then(data => setGames(data))
    },[])

    //onchange function that will set the new event
    const changeEventState = (evt) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[evt.target.name] = evt.target.value
        setCurrentEvent(newEvent)
    }

    // html display of the event form
    return(
        <form>
            <h2>Create a New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <div className="control">
                        <select name="game"
                            proptype="int"
                            value={currentEvent.game}
                            onChange={changeEventState}>
                            <option value="0">Select your game...</option>
                            {games.map(game => (
                                <option key = {game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description of your event: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of your event: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of your event: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: parseInt(localStorage.getItem("token"))
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}