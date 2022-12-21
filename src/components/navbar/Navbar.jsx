import React from 'react'
import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className='search'>
          <input type="text" placeholder='Поиск...' />
          <SearchOutlinedIcon/>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className='icon'/>
            Русский
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className='icon'/>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className='icon'/>
          </div>
          <div className="item">
            <ListOutlinedIcon className='icon'/>
          </div>
          <div className="item">
            <img 
              src='https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTc2MjYxMDA5ODUyNjA1NjEz/ten-facts-about-zero-two.png'
              alt='avatar'
              className='avatar'
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar