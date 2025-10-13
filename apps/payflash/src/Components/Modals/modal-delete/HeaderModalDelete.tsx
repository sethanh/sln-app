import { ICModal } from "@my-monorepo/payflash/Assets";
import { Block, FlexBox } from "@my-monorepo/ui";


export const HeaderModalDelete = () => {
    return (
        <Block className='header-modal-delete'  >
            <Block
                width={48}
                height={48}
                backgroundColor='#FEE4E2'
                borderRadius={999}
            >
                <FlexBox justifyContent='center' alignItems='center' height='100%' width='100%'>
                    <ICModal.Trash color='red' />
                </FlexBox>
            </Block>
        </Block>
    );
};
