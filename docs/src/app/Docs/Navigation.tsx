import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router';

import { List, ListItem, ListItemButton, ListItemContent, ListSubheader, Typography } from '@mui/joy';

import Amicon, {
  aiAmicons,
  aiArrowRotateRight,
  aiArrowsDownLeftRightUpCenter,
  aiCircleHalfInner,
  aiHeart,
  aiReact,
  aiSpinner,
  aiStar
} from '@studio384/amicons';

export default function DocsNavigation() {
  const location = useLocation();

  const pages = [
    {
      title: 'Get started',
      icon: aiAmicons,
      pages: [
        {
          title: 'Installation',
          icon: aiAmicons,
          link: '/docs/installation'
        }
      ]
    },
    {
      title: 'React component',
      icon: aiReact,
      pages: [
        {
          title: 'Spin',
          icon: aiSpinner,
          link: '/docs/spin'
        },
        {
          title: 'Rotate',
          icon: aiArrowRotateRight,
          link: '/docs/rotate'
        },
        {
          title: 'Flip',
          icon: aiArrowsDownLeftRightUpCenter,
          link: '/docs/flip'
        },
        {
          title: 'Beat',
          icon: aiHeart,
          link: '/docs/beat'
        },
        {
          title: 'Fade',
          icon: aiCircleHalfInner,
          link: '/docs/fade'
        }
      ]
    },
    {
      title: 'More',
      icon: aiStar,
      pages: [
        {
          title: 'Changelog',
          icon: aiStar,
          link: '/changelog'
        }
      ]
    }
  ];

  return (
    <List
      sx={{
        p: 0,
        gap: 0.25,
        '--ListItem-paddingY': 0,
        '--ListItem-radius': 'var(--joy-radius-md)',
        '--ListItem-paddingLeft': '.5rem',
        '--ListItem-paddingRight': '.5rem',
        '--ListItemDecorator-size': '1.5rem'
      }}
    >
      {pages.map((category, key) => (
        <Fragment key={key}>
          <ListSubheader sx={{ '&:not(:first-child)': { mt: 2 } }}>
            <Typography level="title-sm" textTransform="none" letterSpacing="initial" fontSize="md" startDecorator={<Amicon icon={category.icon} />}>
              {category.title}
            </Typography>
          </ListSubheader>
          {category.pages.map((page) => (
            <ListItem key={page.link}>
              <ListItemButton component={NavLink} to={page.link} color="primary" selected={location.pathname.includes(page.link)}>
                <ListItemContent>
                  <Typography noWrap>{page.title}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </Fragment>
      ))}
    </List>
  );
}
