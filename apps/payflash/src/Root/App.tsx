import { PayFlashLayout } from '@my-monorepo/payflash/Layouts'
import { ManagementBrowserRouter } from '@my-monorepo/payflash/Routes'
import { ManagementRootRoute } from '@my-monorepo/payflash/Routes'

function App() {
  return (
    <ManagementBrowserRouter>
      <ManagementRootRoute />
      <PayFlashLayout />
    </ManagementBrowserRouter>
  )
}

export default App
