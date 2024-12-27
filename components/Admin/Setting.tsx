'use client'
import dynamic from "next/dynamic";
import SiteKill from "./settings/SiteKill";
import Variables from "./settings/Variables";
import LogoSetting from "./settings/LogoSetting";
import BannerSetting from "./settings/BannerSetting";
import SocialSetting from "./settings/SocialSetting";
import FooterSetting from "./settings/FooterSetting";
import FAQSetting from "./settings/FAQSetting";
import AdminsSetting from "./settings/AdminsSetting";

const PolicyEditor = dynamic(() => import("./settings/PolicyEditor"), {
  ssr: false,
});

const TermsEditor = dynamic(() => import("./settings/TermsEditor"), {
    ssr: false,
  });
  

const Setting = () => {
  return (
    <>
      <SiteKill />
      <AdminsSetting />
      <Variables />
      <LogoSetting />
      <BannerSetting />
      <SocialSetting />
      <FooterSetting />
      <PolicyEditor />
      <TermsEditor />
      <FAQSetting />
    </>
  );
};

export default Setting;
