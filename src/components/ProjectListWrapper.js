import React from 'react'
import ProjectsList from './ProjectsList'


// imports for react-sidenav
// import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav'
import styled from 'styled-components'
// import SvgIcon from 'react-icons-kit'
// import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio'
// import { ic_business } from 'react-icons-kit/md/ic_business'

const BaseContainer = (props) => {
  return (
    <div
        style={{
            display: 'inline-block',
            paddingTop: 16,
            paddingBottom: 16,
            fontFamily: 'Roboto',
            width: 240,
            ...props.style
        }}
    >
        {props.children}
    </div>
  )
}

// const Title = styled.div`
//     padding: 12px;
// `;

const Separator = styled.div`
    padding-right: 12px;
`;

// const SeparatorTitleContainer = styled.div`
//     font-size: 14px;
//     color: #AAA;
//     margin: 10px 12px;
//     padding: 4px 12px 2px;
// `;

// const SeparatorTitle = (props) => {
//     return (
//         <SeparatorTitleContainer>
//             {props.children}
//             <hr style={{ border: 0, borderTop: '1px solid #E5E5E5' }} />
//         </SeparatorTitleContainer>
//     )
// }

const ProjectListWrapper = (props) => {
  return (
    <div>
      <BaseContainer
        style={{
            fontSize: 12,
            background: '#2d353c',
            color: '#a8acb1',
            paddingTop: 0
        }}>
        <div style={{ display: 'flex', padding: 16, background: '#1a2229' }}>
            <div style={{ width: 40, height: 40 }}>
                <img
                    src="code_logo.jpeg"
                    style={{ borderRadius: '30px', width: 40, height: 40 }}
                />
            </div>
            <div style={{ paddingLeft: 6, paddingTop: 6 }}>
                <div style={{ fontSize: 12, color: '#E5E5E5' }}>
                    {' '}Editr{' '}
                </div>
                <div style={{ fontSize: 11 }}> Parallel Coding Editor </div>
            </div>
        </div>
      </BaseContainer>
      <Separator />
      <BaseContainer
        style={{
            background: '#474C56',
            color: '#444',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }}>

        <ProjectsList projects={props.projects} showProject={props.showProject} />

      </BaseContainer>
    </div>
  )
}

export default ProjectListWrapper