import { PayFlashLayout } from '@my-monorepo/payflash/Layouts'
import { ManagementBrowserRouter } from '@my-monorepo/payflash/Routes'
import { ManagementRootRoute } from '@my-monorepo/payflash/Routes'
import { Initializer } from './Initizlizer'
import { RealtimeRoot } from './Context'
import { DrawerGlobal, ModalGlobal } from '@my-monorepo/ui'

function App() {
  return (
    <ManagementBrowserRouter>
      <RealtimeRoot/> 
      <DrawerGlobal/>
      <ModalGlobal/>
      <Initializer>
        <ManagementRootRoute />
        <PayFlashLayout />
      </Initializer>
    </ManagementBrowserRouter>
  )
}

export default App
