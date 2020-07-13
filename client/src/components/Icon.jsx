import React from 'react';

export default ({ icon }) => (
  <span className="hs-icon-wrapper" dangerouslySetInnerHTML={{ __html: window.feather.icons[icon].toSvg({ 'stroke-width': 1 }) }}></span>
);