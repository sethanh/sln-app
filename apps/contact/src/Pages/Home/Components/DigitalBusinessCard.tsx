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
import { Avatar, Button, message } from "antd";
import { appConstant } from "@my-monorepo/contact/Constants";
import { ICSocial } from "@my-monorepo/contact/Assets";
import { ContactResponse, SocialType } from "@my-monorepo/contact/Models";

interface DigitalBusinessCardProps {
  contact?: ContactResponse | null;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = (props: DigitalBusinessCardProps) => {
  const { contact } = props;

  // 🧩 Format số điện thoại
  const formatPhoneNumber = (phone?: string): string => {
    if (!phone) return "";

    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("0")) {
      digits = "+84" + digits.slice(1);
    } else if (!digits.startsWith("+84")) {
      digits = "+84" + digits;
    }

    const numberPart = digits.replace("+84", "");
    const formatted =
      "(+84) " +
      numberPart.replace(
        /(\d{3})(\d{3})(\d{3,})/,
        (_, a, b, c) => `${a}-${b}-${c}`
      );

    return formatted;
  };

  const isMobileDevice = (): boolean => {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );
  };

  const saveContactToPhone = (contact: ContactResponse) => {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${contact.name || ""}
TEL;TYPE=CELL:${contact.phoneNumber || ""}
EMAIL;TYPE=INTERNET:${contact.email || ""}
ORG:${contact.job || ""}
END:VCARD
    `.trim();

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${contact.name || "contact"}.vcf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const copyPhoneToClipboard = async (phone?: string) => {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone);
      message.success("The phone number has been copied to the clipboard!");
    } catch {
      message.error("Try again!");
    }
  };

  // 🧩 Map social icons
  const socialIconMap: Record<number, JSX.Element> = {
    [SocialType.Facebook]: <FacebookOutlined style={{ fontSize: 22 }} />,
    [SocialType.X]: <XOutlined style={{ fontSize: 22 }} />,
    [SocialType.Github]: <GithubOutlined style={{ fontSize: 22 }} />,
    [SocialType.Instagram]: (
      <InstagramOutlined style={{ fontSize: 22, color: "#E4405F" }} />
    ),
    [SocialType.Spotify]: (
      <SpotifyOutlined style={{ fontSize: 22, color: "#1DB954" }} />
    ),
    [SocialType.Tiktok]: <TikTokOutlined style={{ fontSize: 22 }} />,
    [SocialType.Youtube]: (
      <YoutubeOutlined style={{ fontSize: 22, color: "#FF0000" }} />
    ),
  };

  if (!contact) return null;

  return (
    <div className="page-bg-wrapper">
      <div className="page-bg">
        <div className="bg-blob-all"></div>
        <div className="bg-blob"></div>
        <div className="bg-blob-bottom"></div>

        <FlexBox
          direction="column"
          gap={48}
          backgroundColor="transparent"
          padding={24}
        >
          <div style={{ height: 18 }} />
          <FlexBox gap={16} alignItems="center" justifyContent="center">
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

          {/* Contact Info */} <FlexBox gap={16} alignItems="center" justifyContent="center"> 
              <Button shape="circle" icon={<ICSocial.Mobile />} /> 
              <FlexBox direction="column"> 
                <TextCommon color="#191b20">{formatPhoneNumber(contact?.phoneNumber)}</TextCommon>
                 <TextCommon color="#a2aabb" fontStyle="italic">{contact?.email}</TextCommon> 
                 </FlexBox> 
            </FlexBox>

          {/* Social Icons */}
          {contact?.socialContacts && contact.socialContacts.length > 0 && (
            <FlexBox
              alignItems="center"
              justifyContent={
                contact.socialContacts.length > 1 ? "space-between" : "center"
              }
              gap={8}
            >
              {contact.socialContacts.map((s, idx) => {
                const icon = socialIconMap[Number(s.socialType)];
                if (!icon) return null;
                return (
                  <Button
                    key={idx}
                    shape="circle"
                    style={{ padding: 18 }}
                    icon={icon}
                    onClick={() =>
                      s.link && window.open(s.link, "_blank")
                    }
                  />
                );
              })}
            </FlexBox>
          )}

          {/* Buttons */}
          <FlexBox
            direction="column"
            gap={8}
            alignItems="center"
            justifyContent="center"
          >
            <FlexBox
              alignItems="center"
              justifyContent="space-between"
              width={"100%"}
              gap={12}
            >
              <div
                className="btn-save"
                onClick={() => {
                  if (!contact) return;
                  if (isMobileDevice()) {
                    saveContactToPhone(contact);
                  } else {
                    copyPhoneToClipboard(contact.phoneNumber);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <ICSocial.Save />
                <TextCommon>Save contact</TextCommon>
              </div>
              <div className="btn-connect">
                <ICSocial.Connect />
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
