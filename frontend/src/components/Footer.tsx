import tmdb_logo from '../assets/images/tmdb_logo.svg'
import github_logo from '../assets/images/github_logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-700 w-full rounded-lg shadow m-4 bottom-0">
      <div className="mx-auto p-4 flex items-center justify-center">
        <div className='flex flex-row space-x-4'>
          Powered by
          <a href="https://www.themoviedb.org" target='_blank' className="flex items-center space-x-3">
            <img src={tmdb_logo} alt='tmdb logo' className='h-6' />
          </a>
        </div>
        <div className="w-3 border-r-2 border-white mx-5">&nbsp;</div>
        <div className='space-x-6'>
          <a href="https://github.com/jbanghw/mvplnr" target='_blank' className="flex items-center space-x-3">
            <img src={github_logo} alt='github logo' className='h-8' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer