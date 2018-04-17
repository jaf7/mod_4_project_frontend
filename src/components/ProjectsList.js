import React from 'react'

// imports for react-sidenav
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
// import { ic_business } from 'react-icons-kit/md/ic_business';

const ProjectList = (props) => {
  // properties are project id, title, users

  return (
    <div>
      {
        props.projects.map(project =>
        <div  key={project.id}> 
          <SideNav highlightColor='#C8CACC' highlightBgColor='#484D56' hoverColor='#FFFFFF' hoverBgColor='#31343B' defaultSelected={`${project.id}`} onItemSelection={() => props.showProject(project.id)} >
              <Nav id={`${project.id}`} >
                  <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                  <NavText> {project.title} </NavText>
              </Nav>
          </SideNav>
        </div>)
      }
    </div>

  )
}

export default ProjectList

// style={{background: '#2c3e50', color: '#FFF', width: 220, height: 'auto'}}