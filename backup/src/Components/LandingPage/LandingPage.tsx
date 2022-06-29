
import Authentication from '../Authentication/Authentication'
import LandingCard from '../Common/LandingCard/LandingCard'
import './LandingPage.scss'
export default function LandingPage() {
  return (
    <div className='ladingPage'>
      <LandingCard/>
      <Authentication/>
    </div>
  )
}
