import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  SpotifyOutlined,
  TikTokOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FlexBox, TextCommon } from "@my-monorepo/ui";
import React from "react";
import "./DigitalBusinessCard.css";
import { Avatar, Button } from "antd";
import { appConstant } from "@my-monorepo/contact/Constants";
import { ICSocial } from "@my-monorepo/contact/Assets";
import { ContactResponse } from "@my-monorepo/contact/Models";

interface DigitalBusinessCardProps {
  contact?: ContactResponse | null;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = (props: DigitalBusinessCardProps) => {
  const {contact} = props;
  
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
                src={`${appConstant.apiUrl}/${contact?.photo?.relativePath}`}
                size={90}
                style={{ border: "1px solid rgba(143, 140, 140, 0.1)" }}
              />
            </div>
            <FlexBox direction="column">
              <TextCommon fontSize={28} fontWeight={600} color="#191b20">
                {contact?.name}
              </TextCommon>
              <TextCommon color="#a2aabb">{contact?.job}</TextCommon>
            </FlexBox>
          </FlexBox>

          {/* Contact Info */}
          <FlexBox gap={16} alignItems="center" justifyContent="center">
            <Button shape="circle" icon={<ICSocial.Mobile />} />
            <FlexBox direction="column">
              <TextCommon color="#191b20">{contact?.phoneNumber}</TextCommon>
              <TextCommon color="#a2aabb">{contact?.email}</TextCommon>
            </FlexBox>
          </FlexBox>

          {/* Social Icons */}
          <FlexBox alignItems="center" justifyContent="space-between">
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
            <FlexBox alignItems="center" justifyContent="space-between" width={"100%"} gap={12}>
              <div className="btn-save">
                <ICSocial.Save/>
                <TextCommon>Save contact</TextCommon>
              </div>
              <div className="btn-connect">
                <ICSocial.Connect/>
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
