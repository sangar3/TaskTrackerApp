import PropTypes from 'prop-types'

const Header = ({ title }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <button className='btn'>Add</button>
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
