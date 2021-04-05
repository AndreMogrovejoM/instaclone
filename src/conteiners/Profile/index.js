/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import Header from '../../components/Header/'

const style = {
    container: {
        padding: '15px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '0px 10px',      
        
    }
}


export default class Profile extends React.Component{
    render() {
        return (
            <div style={style.container}>
                <Header />
                <img src='http://placekitten.com/200/200'/>
            </div>
            
        )
    }
}