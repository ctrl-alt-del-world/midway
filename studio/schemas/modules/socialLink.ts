import {
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedinIn
} from 'react-icons/fa'

const getIcon = icon => {
  switch (icon) {
    case 'Apple':
      return FaApple
    case 'facebook':
      return FaFacebookF
    case 'instagram':
      return FaInstagram
    case 'Soundcloud':
      return FaSoundcloud
    case 'Spotify':
      return FaSpotify
    case 'twitter':
      return FaTwitter
    case 'youtube':
      return FaYoutube
    case 'linkedin':
      return FaLinkedinIn
    case 'github':
      return FaGithub
    default:
      return false
  }
}

export default {
  title: 'Social Link',
  name: 'socialLink',
  type: 'object',
  options: {
    columns: 2,
    collapsible: false
  },
  fields: [
    {
      title: 'Icon',
      name: 'icon',
      type: 'string',
      options: {
        list: [
          { title: 'Apple', value: 'apple' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'Linkedin', value: 'linkedin' },
          { title: 'Github', value: 'github' },
          { title: 'YouTube', value: 'youtube' }
        ]
      }
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    }
  ],
  preview: {
    select: {
      icon: 'icon',
      url: 'url'
    },
    prepare({ icon, url }) {
      return {
        title: icon,
        subtitle: url ? url : '(url not set)',
        media: getIcon(icon)
      }
    }
  }
}
