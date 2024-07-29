import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export const contentTemplates = [
  {
    name: "Youtube Video Description",
    desc: "An AI tool that generate youtube video description from your information",
    category: "Youtube",
    icon: FaYoutube,
    aiPrompt:
      "Give me youtube video description Ideas based on given video description outline and title and give me result in Rich Text Editor format",
    slug: "youtube-description",
    form: [
      {
        id: "youtube-video-description-title",
        label: "Youtube Video Description Title",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        id: "enter-video-description-outline",
        label: "Enter Video Description Outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Video Idea",
    desc: "An AI tool that generate Youtube Video Idea based on given information",
    category: "Youtube",
    icon: FaYoutube,
    aiPrompt:
      "Give me youtube video idea on given video niche & outline topic and give me result in Rich Text Editor format",
    slug: "generate-youtube-video-idea",
    form: [
      {
        id: "enter-your-video-niche",
        label: "Enter your video niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        id: "enter-your-video-idea-outline",
        label: "Enter video outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Instagram Hashtags",
    desc: "An AI tool that generate Instagram hashtags based on your post niche and outline information",
    category: "Instagram",
    icon: FaInstagram,
    aiPrompt:
      "Give me some good examples of instagram hashtags on given niche & outline topic and give me result in Rich Text Editor format",
    slug: "generate-instagram-hashtags",
    form: [
      {
        id: "enter-your-post-niche",
        label: "Enter your post niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        id: "enter-your-post-outline",
        label: "Enter post outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Tiktok Hashtags",
    desc: "An AI tool that generate Tiktok topic idea based on your post niche and outline information",
    category: "Tiktok",
    icon: FaTiktok,
    aiPrompt:
      "Give me some good examples of instagram hashtags on given niche & outline topic and give me result in Rich Text Editor format",
    slug: "generate-tiktok-hashtags",
    form: [
      {
        id: "enter-your-tiktok-post-niche",
        label: "Enter your post niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        id: "enter-your-tiktok-post-outline",
        label: "Enter post outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Linkedin Post",
    desc: "An AI tool that generate Linkedin Post idea based on your post niche and outline information",
    category: "Linkedin",
    icon: FaLinkedin,
    aiPrompt:
      "Give me some good examples of Linkedin Post idea on given niche & outline topic and give me result in Rich Text Editor format",
    slug: "generate-likedin-post",
    form: [
      {
        id: "enter-your-linkedin-post-niche",
        label: "Enter your post niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        id: "enter-your-linkedin-post-outline",
        label: "Enter post outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Tweet",
    desc: "An AI tool that generate Linkedin Post idea based on your post niche and outline information",
    category: "Tweet",
    icon: FaTwitter,
    aiPrompt:
      "Give me 280 characters of tweet example on given niche & outline topic",
    slug: "generate-tweet-post",
    form: [
      {
        id: "enter-your-tweet-post-niche",
        label: "Enter your tweet niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        id: "enter-your-tweet-post-outline",
        label: "Enter tweet outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
];

export type ContentTemplate = (typeof contentTemplates)[number];
