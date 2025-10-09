import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  SolutionOutlined,
  SpotifyOutlined,
  TikTokOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { ICSocial } from "@my-monorepo/payflash/Assets";
import { FlexBox, TextCommon } from "@my-monorepo/ui";
import React from "react";
import "./DigitalBusinessCard.css";
import { Avatar, Button } from "antd";

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
//   socials = {
//     linkedin: "#",
//     behance: "#",
//     github: "#",
//     facebook: "#",
//     youtube: "#",
//     tiktok: "#",
//   },
}) => {
  return (
    <div className="page-bg-wrapper">
      <div className="page-bg">
        <div className="bg-blob-all"></div>
        <div className="bg-blob"></div>
        <div className="bg-blob-bottom"></div>

        <FlexBox direction="column" gap={48} backgroundColor="transparent" padding={24}>
          <div style={{ height: 18 }} />

          {/* Avatar + Info */}
          <FlexBox gap={16} alignItems="center">
            <div className="avatar-border">
              <Avatar
                src={avatar}
                size={90}
                style={{ border: "1px solid rgba(143, 140, 140, 0.1)" }}
              />
            </div>
            <FlexBox direction="column">
              <TextCommon fontSize={28} fontWeight={600} color="#191b20">
                {name}
              </TextCommon>
              <TextCommon color="#a2aabb">{jobTitle}</TextCommon>
            </FlexBox>
          </FlexBox>

          {/* Contact Info */}
          <FlexBox gap={16} alignItems="center" justifyContent="center">
            <Button shape="circle" icon={<ICSocial.Mobile />} />
            <FlexBox direction="column">
              <TextCommon color="#191b20">{phone}</TextCommon>
              <TextCommon color="#a2aabb">{email}</TextCommon>
            </FlexBox>
          </FlexBox>

          {/* Social Icons */}
          <FlexBox gap={12} alignItems="center" justifyContent="center">
            <Button shape="circle" icon={<FacebookOutlined style={{ fontSize: 22 }} />} />
            <Button shape="circle" icon={<XOutlined style={{ fontSize: 22 }} />} />
            <Button shape="circle" icon={<GithubOutlined style={{ fontSize: 22 }} />} />
            <Button shape="circle" icon={<InstagramOutlined style={{ fontSize: 22, color: '#6E88BD' }} />} />
            <Button shape="circle" icon={<SpotifyOutlined style={{ fontSize: 22 }} />} />
            <Button shape="circle" icon={<TikTokOutlined style={{ fontSize: 22 }} />} />
            <Button shape="circle" icon={<YoutubeOutlined style={{ fontSize: 22, color: '#6E88BD' }} />} />
          </FlexBox>

          {/* Buttons */}
          <FlexBox direction="column" gap={8} alignItems="center" justifyContent="center">
            <FlexBox gap={22} alignItems="center" justifyContent="center">
              <div className="btn-save">
                <SolutionOutlined />
                <TextCommon>Save contact</TextCommon>
              </div>
              <div className="btn-connect">
                <SolutionOutlined />
                <TextCommon>Connect</TextCommon>
              </div>
            </FlexBox>
            <div style={{ height: 4 }} />
          </FlexBox>
        </FlexBox>
      </div>
    </div>
  );
};
