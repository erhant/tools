import { FC } from "react"
import { Link } from "react-router-dom"

const Header: FC = () => {
  return (
      <header>
        <div>
        <div><Link to="/">
        Home
        </Link></div>
        <div>Music2</div>
        </div>
        
      </header>
  )
}
export default Header