import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import IframePreview from '../previews/IframePreview.js'

const remoteURL = 'https://midway.ctrlaltdel.world/docs'
const localURL = 'http://localhost:8000/docs'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const DocViews = ({type}) => {
  return [
    S.view.form().icon(EditIcon),
    S.view
      .component(IframePreview)
      .options({previewURL})
      .icon(EyeIcon)
      .title('Documention')
  ]
}