import { FacebookOutlined, GithubOutlined, InstagramOutlined, SolutionOutlined, SpotifyOutlined, TikTokOutlined, XOutlined, YoutubeOutlined } from "@ant-design/icons";
import { ICSocial } from "@my-monorepo/payflash/Assets";
import { FlexBox, TextCommon } from "@my-monorepo/ui";
import React from "react";
import './DigitalBusinessCard.css'

interface DigitalBusinessCardProps {
    name?: string;
    jobTitle?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    socials?: {
        linkedin?: string;
        behance?: string;
        github?: string;
        facebook?: string;
        youtube?: string;
        tiktok?: string;
    };
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({
    name = "Alexander Chen",
    jobTitle = "Product Designer",
    phone = "+1 (555) 123-467",
    email = "alexander.chen@email.com",
    avatar = "https://via.placeholder.com/120x120.png?text=Avatar",
    socials = {
        linkedin: "#",
        behance: "#",
        github: "#",
        facebook: "#",
        youtube: "#",
        tiktok: "#",
    },
}) => {
    return (
        <FlexBox direction="column" gap={32} padding={24} className="digital-business-card">
            <FlexBox gap={16} alignItems='center'>
                <img
                    src={avatar}
                    alt={name}
                    width={96}
                    height={96}
                />
                <FlexBox direction='column'>
                    <TextCommon fontSize={32} fontWeight={600} color="#191b20">{name}</TextCommon>
                    <TextCommon color="#a2aabb">{jobTitle}</TextCommon>
                </FlexBox>
            </FlexBox>
            <FlexBox gap={8} alignItems='center' justifyContent="center">
                <ICSocial.Mobile />
                <FlexBox direction='column'>
                    <TextCommon color="#191b20">{phone}</TextCommon>
                    <TextCommon color="#a2aabb">{email}</TextCommon>
                </FlexBox>
            </FlexBox>

            <FlexBox gap={22} alignItems='center' justifyContent="center" >
                <FacebookOutlined style={{color: '#6E88BD', fontSize: 22 , cursor: 'pointer'}}/>
                <XOutlined style={{ fontSize: 22 , cursor: 'pointer'}}/>
                <GithubOutlined style={{ fontSize: 22 , cursor: 'pointer'}}/>
                <InstagramOutlined style={{color: '#d65d20', fontSize: 22 , cursor: 'pointer'}}/>
                <SpotifyOutlined style={{ fontSize: 22 , cursor: 'pointer'}}/>
                <YoutubeOutlined style={{color: '#FF4D4D', fontSize: 22, cursor: 'pointer'}}/>
                <TikTokOutlined style={{fontSize: 22, cursor: 'pointer'}}/>
            </FlexBox>

            <FlexBox gap={32} alignItems='center' justifyContent="center">
                <div>
                    <SolutionOutlined />
                    <TextCommon>Save contact</TextCommon>
                </div>
                <div>
                    <SolutionOutlined />
                    <TextCommon>Connect</TextCommon>
                </div>
            </FlexBox>
        </FlexBox>
    );
};

