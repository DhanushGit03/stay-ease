import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'

//in typescript we have to define the type of props as well!
interface Props {
    children: React.ReactNode;
}

const LoginLayout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <Hero/>
      <div className='container mx-auto py-10 flex-1'>{children}</div>
      <Footer/>
    </div>
  )
}

export default LoginLayout
