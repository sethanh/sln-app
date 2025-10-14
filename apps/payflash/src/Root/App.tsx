import { PayFlashLayout } from '@my-monorepo/payflash/Layouts'
import { ManagementBrowserRouter } from '@my-monorepo/payflash/Routes'
import { ManagementRootRoute } from '@my-monorepo/payflash/Routes'
import { Initializer } from './Initizlizer'
import { DrawerGlobal, ModalGlobal } from '../Components'

function App() {

  // usePaymentSignalR();
  return (
    <ManagementBrowserRouter>
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
