import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getGames, deleteGame } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    // initial setting of state for games
    const gamesState = () => {
        getGames()
            .then((data) => {
                setGames(data)
            })
    }

    // this useeffect fetches the current state of all games (list)
    useEffect(() => {
        gamesState()
    }, [])

    // delete event listener
    const onClickDelete = (id) => {
        deleteGame(id).then((data) => {
            gamesState(data)
        })
    }

    return (
        <article className="games">
            <button className="btn btn-1"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="edit-btn" onClick={() => {
                            history.push(`games/edit/${game.id}`)
                        }}>Edit Game</button>
                        <button className="delete-btn" onClick={() => { onClickDelete(game.id) }}>Delete Game</button>
                    </section>
                })
            }
        </article>
    )
}