import React from 'react';
import { GroupSidebar } from '@my-monorepo/ui'
import { cardHolderConstants } from '@my-monorepo/payflash/Constants';
import { ICContacts} from '@my-monorepo/payflash/Assets';


export const CardHolderSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Card Holder'
            sidebarItems={cardHolderConstants}
            Icon={<ICContacts.Wallet stroke='#22356F'/>}
            border={true}
            defaultShowItem={true}
        />
    );
};
