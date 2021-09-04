import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({ title , onAdd}) => {

    

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='#457b9d' text='Add' onClick ={onAdd}/>
        </header>
    )
}

Header.defaultProps = {
    title:'SG Task Tracker'
}

//making sure the title is a string and no other datatype
Header.propTypes = {
    title: PropTypes.string.isRequired,
}
// CSS in JS 
// const headingStyle = {
//     color:'red' , 
//     backgroundColor:'black'
// }


export default Header
