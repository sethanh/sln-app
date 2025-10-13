import { PayFlashLayout } from '@my-monorepo/payflash/Layouts'
import { ManagementBrowserRouter } from '@my-monorepo/payflash/Routes'
import { ManagementRootRoute } from '@my-monorepo/payflash/Routes'
import { Initializer } from './Initizlizer'

function App() {
  return (
    <ManagementBrowserRouter>
      <Initializer>
        <ManagementRootRoute />
        <PayFlashLayout />
      </Initializer>
    </ManagementBrowserRouter>
  )
}

export default App
