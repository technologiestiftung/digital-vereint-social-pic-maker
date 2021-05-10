type SocialMediaImageTypeType = "profile" | "content" | "ad";

interface SocialMediaImageType<Type = SocialMediaImageTypeType> {
  id: string;
  title: string;
  width: number;
  height: number;
  type: Type;
  note?: string;
}

type SocialMediaPlatformType =
  | "Instagram"
  | "Twitter"
  | "TikTok"
  | "Facebook"
  | "LinkedIn"
  | "Pinterest"
  | "Youtube";

type SocialMediaImageSizesType = Record<
  SocialMediaPlatformType,
  SocialMediaImageType[]
>;

const socialMediaImageSizes: SocialMediaImageSizesType = {
  Instagram: [
    {
      id: "if_profile_picture",
      type: "profile",
      title: "Profile picture",
      width: 320,
      height: 320,
    },
    {
      id: "if_landscape",
      type: "content",
      title: "Landscape",
      width: 1080,
      height: 566,
    },
    {
      id: "if_portrait",
      type: "content",
      title: "Portrait",
      width: 1080,
      height: 1350,
    },
    {
      id: "if_square",
      type: "content",
      title: "Square",
      width: 1080,
      height: 1080,
    },
    {
      id: "if_instagram_stories_stories_ads",
      type: "content",
      title: "Story",
      width: 1080,
      height: 1920,
      note:
        "Max file size 30mb…but remember the larger the image, the slower the buffer! According to [official guidelines](https://www.facebook.com/business/ads-guide/image/instagram-story/reach), “Consider leaving roughly 14% (250 pixels) of the top and bottom of the image free from text, logos or other key creative elements to avoid covering them with the profile icon or call to action.",
    },
    {
      id: "if_igtv_cover_image",
      type: "content",
      title: "IGTV Cover image",
      width: 654,
      height: 420,
    },
  ],
  Twitter: [
    {
      id: "tw_profile_picture",
      type: "profile",
      title: "Profile picture",
      width: 400,
      height: 400,
      note: "Maximum file size 2mb",
    },
    {
      id: "tw_banner",
      type: "profile",
      title: "Banner",
      width: 1500,
      height: 1500,
      note: "Aspect ratio 3:1",
    },
    {
      id: "tw_tweet",
      type: "content",
      title: "Tweet",
      width: 1024,
      height: 512,
      note:
        "Aspect ratio 16:9. Max file size 5mb for photos/GIFs on phone, 15mb on desktop.",
    },
    {
      id: "tw_summary_card",
      type: "content",
      title: "Summary card",
      width: 120,
      height: 120,
    },
    {
      id: "tw_summary_card_with_large_image",
      type: "content",
      title: "Summary card with large image",
      width: 4096,
      height: 4096,
    },
    {
      id: "tw_player_card_square",
      type: "content",
      title: "Player card square",
      width: 262,
      height: 262,
    },
    {
      id: "tw_player_card_19_9",
      type: "content",
      title: "Player card 19:9",
      width: 359,
      height: 196,
    },
    {
      id: "tw_website_card",
      type: "content",
      title: "Website card",
      width: 800,
      height: 320,
    },
    {
      id: "tw_fleet",
      type: "content",
      title: "Fleet",
      width: 1080,
      height: 1920,
    },
    {
      id: "tw_moment",
      type: "content",
      title: "Moment",
      width: 1080,
      height: 1080,
      note: "Unset in guidelines so up to you!",
    },
    {
      id: "tw_single_multi_image_tweet_ad",
      type: "ad",
      title: "Single/multi image tweet ad",
      width: 600,
      height: 335,
      note: "This is a minimum.",
    },
    {
      id: "tw_website_card_ad_landscape",
      type: "ad",
      title: "Website card ad landscape",
      width: 800,
      height: 418,
      note: "Aspect ratio: 1.91:1",
    },
    {
      id: "tw_website_card_ad_square",
      type: "ad",
      title: "Website card ad square",
      width: 800,
      height: 800,
    },
    {
      id: "tw_app_card_ad",
      type: "ad",
      title: "App card ad",
      width: 800,
      height: 418,
      note: "Max file size of 20mb for 2—6 image cards.",
    },
    {
      id: "tw_direct_message_card_ad",
      type: "ad",
      title: "Direct message card ad",
      width: 800,
      height: 418,
      note: "Max file size of 20mb for 2—6 image cards.",
    },
    {
      id: "tw_conversation_card_ad",
      type: "ad",
      title: "Conversation card ad",
      width: 800,
      height: 418,
      note: "Max file size of 3mb.",
    },
  ],
  TikTok: [
    {
      id: "tt_profile_picture",
      type: "profile",
      title: "Profile picture",
      width: 200,
      height: 200,
    },
    {
      id: "tt_video_cover_portrait",
      type: "content",
      title: "Video cover portrait",
      width: 1080,
      height: 1920,
    },
    {
      id: "tt_video_cover_square",
      type: "content",
      title: "Video cover square",
      width: 1080,
      height: 1080,
    },
    {
      id: "tt_ad_portrait",
      type: "ad",
      title: "Ad portrait",
      width: 720,
      height: 1280,
    },
    {
      id: "tt_ad_square",
      type: "ad",
      title: "Ad square",
      width: 1200,
      height: 1200,
    },
    {
      id: "tt_ad_landscape",
      type: "ad",
      title: "Ad landscape",
      width: 1200,
      height: 720,
    },
  ],
  Facebook: [
    {
      id: "fb_profile_picture_desktop",
      type: "profile",
      title: "Profile picture desktop",
      width: 170,
      height: 170,
    },
    {
      id: "fb_profile_picture_smartphone",
      type: "profile",
      title: "Profile picture smartphone",
      width: 128,
      height: 128,
    },
    {
      id: "fb_cover_photo_desktop",
      type: "profile",
      title: "Cover photo desktop",
      width: 820,
      height: 312,
    },
    {
      id: "fb_cover_photo_smartphone",
      type: "profile",
      title: "Cover photo smartphone",
      width: 640,
      height: 360,
      note: "Ideal file size is less than 100kb",
    },
    {
      id: "fb_post",
      type: "content",
      title: "Post",
      width: 1200,
      height: 630,
    },
    {
      id: "fb_carousel",
      type: "content",
      title: "Carousel",
      width: 1200,
      height: 1200,
    },
    {
      id: "fb_event_cover_photos",
      type: "content",
      title: "Event cover photos",
      width: 1200,
      height: 628,
    },
    {
      id: "fb_story",
      type: "content",
      title: "Story",
      width: 1080,
      height: 1920,
      note:
        "Max file size 30mb. Avoid 250 pixels at the top and the bottom to prevent overlap with text.",
    },
    {
      id: "fb_feed_ad",
      type: "ad",
      title: "Feed ad",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_right_column_ad",
      type: "ad",
      title: "Right column ad",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_instant_article",
      type: "ad",
      title: "Instant article",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_marketplace_ad",
      type: "ad",
      title: "Marketplace ad",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_search_ad",
      type: "ad",
      title: "Search ad",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_sponsored_message",
      type: "ad",
      title: "Sponsored message",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_messenger_inbox_ad",
      type: "ad",
      title: "Messenger inbox ad",
      width: 1080,
      height: 1080,
    },
    {
      id: "fb_messenger_stories_ad",
      type: "ad",
      title: "Messenger stories ad",
      width: 1080,
      height: 1080,
    },
  ],
  LinkedIn: [
    {
      id: "li_profile_picture",
      type: "profile",
      title: "Profile picture",
      width: 400,
      height: 400,
      note: "max file size is 8mb.",
    },
    {
      id: "li_cover_image",
      type: "profile",
      title: "Cover image",
      width: 1584,
      height: 396,
    },
    {
      id: "li_profile_picture_business_page",
      type: "profile",
      title: "Profile picture (business page)",
      width: 300,
      height: 300,
    },
    {
      id: "li_banner_business_page",
      type: "profile",
      title: "Banner (business page)",
      width: 1128,
      height: 191,
    },
    {
      id: "li_life_tab_main_image_business_page",
      type: "profile",
      title: "Life tab main image (business page)",
      width: 1128,
      height: 376,
    },
    {
      id: "li_life_tab_custom_module_business_page",
      type: "profile",
      title: "Life tab custom module (business page)",
      width: 502,
      height: 282,
    },
    {
      id: "li_life_tab_company_photo_business_page",
      type: "profile",
      title: "Life tab company photo (business page)",
      width: 900,
      height: 600,
    },
    {
      id: "li_image_for_blog_post",
      type: "content",
      title: "Image for blog post",
      width: 1200,
      height: 627,
    },
    {
      id: "li_story",
      type: "content",
      title: "Story",
      width: 1080,
      height: 1920,
    },
    {
      id: "li_company_spotlight_ad_logo",
      type: "ad",
      title: "Company spotlight ad logo",
      width: 100,
      height: 100,
    },
    {
      id: "li_spotlight_ad",
      type: "ad",
      title: "Spotlight ad",
      width: 300,
      height: 250,
    },
    {
      id: "li_sponsored_content_image",
      type: "ad",
      title: "Sponsored content image",
      width: 1200,
      height: 627,
    },
    {
      id: "li_sponsored_content_carousel",
      type: "ad",
      title: "Sponsored content carousel",
      width: 1080,
      height: 1080,
    },
  ],
  Youtube: [
    {
      id: "yt_profile_picture",
      type: "profile",
      title: "Profile picture",
      width: 800,
      height: 800,
    },
    {
      id: "yt_banner",
      type: "profile",
      title: "Banner",
      width: 2560,
      height: 1440,
      note: "Max file size 6mb",
    },
  ],
  Pinterest: [
    {
      id: "pt_standard_pin",
      type: "content",
      title: "Standard pin",
      width: 1000,
      height: 1500,
    },
    {
      id: "pt_square_pin",
      type: "content",
      title: "Square pin",
      width: 1000,
      height: 1000,
    },
    {
      id: "pt_long_pin",
      type: "content",
      title: "Long pin",
      width: 1000,
      height: 2100,
    },
    {
      id: "pt_infographic",
      type: "content",
      title: "Infographic",
      width: 1000,
      height: 3000,
    },
  ],
};

export const getAllSMImageSizes = (): SocialMediaImageType[] =>
  Object.values(socialMediaImageSizes).flat();

export const getSMContentImageSizes = (): SocialMediaImageType<"content">[] =>
  getAllSMImageSizes().filter(
    ({ type }) => type === "content"
  ) as SocialMediaImageType<"content">[];

export const getSMProfileImageSizes = (): SocialMediaImageType<"profile">[] =>
  getAllSMImageSizes().filter(
    ({ type }) => type === "profile"
  ) as SocialMediaImageType<"profile">[];

export const getSMAdImageSizes = (): SocialMediaImageType<"ad">[] =>
  getAllSMImageSizes().filter(
    ({ type }) => type === "ad"
  ) as SocialMediaImageType<"ad">[];

export default socialMediaImageSizes;
