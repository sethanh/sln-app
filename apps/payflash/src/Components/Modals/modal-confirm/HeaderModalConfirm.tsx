import { ICModal } from "@my-monorepo/payflash/Assets";
import { Block, FlexBox } from "@my-monorepo/ui";


export const HeaderModalConfirm = () => {
    return (
        <Block className='header-modal-delete'  >
            <Block
                width={48}
                height={48}
                backgroundColor='#DCFAE6'
                borderRadius={999}
            >
                <FlexBox justifyContent='center' alignItems='center' height='100%' width='100%'>
                    <ICModal.Refresh color='green' />
                </FlexBox>
            </Block>
        </Block>
    );
};
