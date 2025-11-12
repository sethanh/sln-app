import { FlexBox } from "@my-monorepo/ui"
import { RequestConnectPage } from "./RequestConnectPage";

interface ContentProps {
    activeTab: "Friends" | "Requests";
}

export const ConnectPageContent: React.FC<ContentProps> = ({ activeTab }) => {
    
    switch (activeTab) {
        case "Friends":
            return <FlexBox>Friends Content</FlexBox>;
        case "Requests":
            return <RequestConnectPage/>;
        default:
            return null;
    }
}