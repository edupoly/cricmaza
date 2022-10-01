import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-danger navbar-dark">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" to="/addPlayer">Add Player</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/addTeam">Add Team</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/addMatch">Add Match</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/addScore">AddScore</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar