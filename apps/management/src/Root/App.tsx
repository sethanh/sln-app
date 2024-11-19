import { ManagementLayout } from '@my-monorepo/management/Layouts'
import { ManagementBrowserRouter } from '@my-monorepo/management/Routes'


const App: React.FC = () => {

  return (
    <ManagementBrowserRouter>
      <ManagementLayout />
    </ManagementBrowserRouter>
  )
}

export default App
