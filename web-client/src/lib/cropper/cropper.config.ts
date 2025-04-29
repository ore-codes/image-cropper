export const CropperConfig = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  aspectRatios: [
    { label: 'Aspect Ratio: Dynamic', value: NaN },
    { label: 'Square (1:1)', value: 1 },
    { label: 'Landscape (16:9)', value: 16 / 9 },
    { label: 'Portrait (9:16)', value: 9 / 16 },
    { label: 'Widescreen (21:9)', value: 21 / 9 },
  ],
};
