import { ManagementLayout } from './Layouts'
import { ManagementBrowserRouter } from './Routes'

function App() {
  return (
    <ManagementBrowserRouter>
      <ManagementLayout />
    </ManagementBrowserRouter>
  )
}

export default App

// context outside ManagementBrowserRouter