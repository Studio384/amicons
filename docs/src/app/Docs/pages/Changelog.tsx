import { Stack } from '@mui/joy';

import Code from '@/design/components/Code';

import Release from './_Release';

export default function Changelog() {
  return (
    <Stack gap={5}>
      <Release
        name="Amicons 1.0 alpha 10"
        version="1.0.0-alpha.10"
        date="5 June 2025"
        newIcons={[
          'align-content-center',
          'align-content-end',
          'align-content-start',
          'arrow-right-to-bracket-clock',
          'bluesky',
          'clock-pause',
          'clock-slash',
          'list-bar-chart',
          'record-stop',
          'record',
          'signal-fair',
          'signal-good',
          'signal-moderate',
          'signal-slash',
          'signal-strong',
          'signal-weak'
        ]}
        updatedIcons={['facebook-messenger']}
      />
      <Release name="Amicons 1.0 alpha 9" version="1.0.0-alpha.9" date="19 December 2024" added={[<>Amicons now supports React 19.</>]} />
      <Release
        name="Amicons 1.0 alpha 8"
        version="1.0.0-alpha.8"
        date="17 November 2024"
        changed={[
          <>
            Changes the import from <Code>@studio384/amaranth</Code> to <Code>@studio384/amicons</Code>.
          </>
        ]}
        newIcons={[
          'angles-x',
          'apple',
          'arrow-left-arrow-right',
          'arrow-rotate-left',
          'bars-uneven',
          'burger-glass',
          'cloud-softphone',
          'diagram',
          'fanvil',
          'glass',
          'grip-dots-h',
          'magnifying-glass-min',
          'magnifying-glass-min',
          'magnifying-glass-plus',
          'magnifying-glass-plus',
          'microphone-slash',
          'moped',
          'order-alphabetical-asc',
          'order-alphabetical-desc',
          'order-numerical-asc',
          'order-numerical-desc',
          'password',
          'phone-xmark',
          'teams',
          'yealink'
        ]}
        updatedIcons={['angles-y', 'magnifying-glass', 'windows']}
        renamedIcons={[
          { old: 'thumbstack', new: 'thumbtack' },
          { old: 'thumbstack-slash', new: 'thumbtack-slash' }
        ]}
      />
      <Release
        name="Amicons 1.0 alpha 7"
        date="12 March 2024"
        version="1.0.0-alpha.7"
        added={[
          <>
            Introduces a brand new documentation website with improved icon previews, component documentation with interactive playground, this changelog, and
            much more. And best of all; it's now available online instead of needing to be compiled by you.
          </>,
          <>
            The <Code>AmaranthIcon</Code> component has been renamed to <Code>Amicon</Code>.
          </>,
          <>
            The <Code>Amicon</Code> component now supports the <Code>beat</Code> and <Code>fade</Code> property.
          </>
        ]}
        changed={[
          <>
            We're updating our branding from Amaranth to Amicons, with a brand new logo and mascot to boot. While the <Code>Amaranth</Code> and{' '}
            <Code>Amicons</Code> icons have existed at the same time in the previous version, we consider the removal of the <Code>Amaranth</Code> icon a
            rename.
          </>,
          <>
            The default values for all properties of our <Code>Amicon</Code> component are now being set to <Code>Undefined</Code> rather than a default truthy
            value.
          </>,
          <>
            The various CSS variables have been renamed to be more consistent with new variables introduced in this update. See the documentation for more info.
          </>,
          <>
            You can now pass properties to the <Code>Amicon</Code> component.
          </>,
          <>Various updates to the categorization of icons in the documentation.</>
        ]}
        fixed={[
          <>
            Fixed the <Code>expand</Code> icon including excessive shapes.
          </>,
          <>
            Fixed the misalignment in the <Code>heading-2</Code> icon to better map the icon to a pixel grid.
          </>,
          <>
            Fixes various issues with the CSS variables in the <Code>Amicon</Code> component.
          </>
        ]}
        newIcons={[
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'a',
          'arrow-down-arrow-up',
          'arrow-up-right-from-square',
          'b',
          'battery-charging',
          'battery-empty',
          'battery-exclamation',
          'battery-full',
          'battery-half',
          'battery-low',
          'battery-quarter',
          'battery-slash',
          'battery-three-quarter',
          'broom',
          'c',
          'calculator',
          'camera',
          'car-side',
          'clipboard',
          'command',
          'computer-mouse-scroll-wheel',
          'computer-mouse',
          'crop',
          'cursor',
          'd',
          'dice-five',
          'dice-four',
          'dice-one',
          'dice-six',
          'dice-three',
          'dice-two',
          'dice',
          'e',
          'ellipsis-h',
          'envelope-open',
          'export',
          'f',
          'file-audio',
          'file-excel',
          'file-powerpoint',
          'file-text',
          'file-word',
          'file-zip',
          'flask',
          'folder-min',
          'folder-open',
          'folder-plus',
          'frame',
          'g',
          'grip-dots-v',
          'grip-dots',
          'h',
          'i',
          'icons',
          'j',
          'k',
          'keyboard-brightness-high',
          'keyboard-brightness-low',
          'keyboard',
          'l',
          'loader',
          'm',
          'n',
          'o',
          'option',
          'p',
          'q',
          'r',
          'road',
          's',
          'share-nodes',
          'spinner',
          'square-dashed',
          'square',
          'studio-384',
          't',
          'threads',
          'toast',
          'train-track',
          'triangle-dashed',
          'triangle',
          'truck-pickup',
          'truck-tow',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        ]}
        updatedIcons={[
          'a-gum',
          'envelope',
          'facebook',
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'patreon',
          'safari',
          'shuffle',
          'translate',
          'triangle-exclamation',
          'volume-0',
          'volume-1',
          'volume-2',
          'volume-3',
          'volume-slash'
        ]}
        renamedIcons={[
          { old: 'amaranth', new: 'amicons' },
          { old: 'ellipsis', new: 'ellipsis-h' }
        ]}
        removedIcons={['amaranth', 'bootstrap', 'font-awesome']}
      />
      <Release
        name="Amaranth 1.0 alpha 6"
        version="1.0.0-alpha.6"
        date="30 January 2024"
        newIcons={['align-center', 'align-justify', 'align-left', 'align-right', 'amicons', 'subscript', 'superscript']}
      />
      <Release name="Amaranth 1.0 alpha 5" version="1.0.0-alpha.5" date="17 November 2023" newIcons={['circle']} />
      <Release
        name="Amaranth 1.0 alpha 4"
        version="1.0.0-alpha.4"
        date="17 November 2023"
        newIcons={[
          'arrow-down-from-cloud',
          'arrow-right-from-file',
          'arrow-right-from-smartphone',
          'arrow-right-to-file',
          'arrow-up-to-cloud',
          'compare',
          'people-xmark',
          'person-xmark',
          'react'
        ]}
      />
      <Release
        name="Amaranth 1.0 alpha 3"
        version="1.0.0-alpha.3"
        date="23 August 2023"
        removed={[<>The repository no longer provides font files or CSS files.</>]}
        newIcons={[
          'table-cell-merge',
          'table-column-insert-left',
          'table-column-insert-right',
          'table-column-min',
          'table-header-cell',
          'table-min',
          'table-row-insert-bottom',
          'table-row-insert-top',
          'table-row-min'
        ]}
        updatedIcons={['chart-pie', 'circle-dashed', 'table-clcok', 'table-header-column', 'table-header-row', 'table', 'tag-geear', 'tag-plus', 'tag']}
      />
      <Release name="Amaranth 1.0 alpha 2" version="1.0.0-alpha.2" date="22 August 2023" changed={[<>Migrations from ChangeWindows to Studio 384</>]} />
    </Stack>
  );
}
