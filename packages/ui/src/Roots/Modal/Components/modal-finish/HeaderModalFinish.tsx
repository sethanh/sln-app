import { Block, FlexBox } from "@my-monorepo/ui";


export const HeaderModalFinish = () => {
    return (
        <Block className='header-modal-finish'>
            <Block
                width={48}
                height={48}
                backgroundColor='#DCFAE6'
                borderRadius={8}
            >
                <FlexBox justifyContent='center' alignItems='center' height='100%' width='100%'>
                    <Block>
                        {/* <ICModal.Check color='white'/> */}
                    </Block>
                </FlexBox>
            </Block>
        </Block>
    );
};
