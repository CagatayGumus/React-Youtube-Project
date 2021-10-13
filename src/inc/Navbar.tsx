import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Menu } from 'semantic-ui-react'

export default function Navbar() {

    const [activeItem, setactiveItem] = useState("")

    
    return (
        <>
        
        <Segment inverted>
                <Menu inverted pointing secondary>
                <Menu.Item
                    name='Youtube(Beta)'as={Link} to="/"
                    icon =  "youtube"
                   
                />
                <Menu.Item
                    name='home'as={Link} to="/"
                    active={activeItem === 'home'}
                    onClick={ (e) => setactiveItem('home')  }
                />
                </Menu>
      </Segment>
            
        </>
    )
}
