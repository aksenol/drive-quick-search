# drive-quick-search
Google Drive Quick Search




Notes:

* By default only searches Google Docs items (docs, spreadsheets, presentations, drawings, etc), and ones last viewed by your account since June 2010. This improves the results quality.




<center>
<img src="https://cloud.githubusercontent.com/assets/1487421/7662639/ec9072ac-fb2c-11e4-9e4c-bbea226c3972.png">
</center>




<hr>

## Developing

Changing icon:

Install imagemagic and run this `declare statement`: https://github.com/alrra/browser-logos/blob/1bcb328bdeeb7e20278aa637b6790928d1b64121/scripts/generate-images.sh#L15-L25

```sh
convert logo.png $CONVERT_BASE_OPTIONS -resize 128x128 icon128.png
convert logo.png $CONVERT_BASE_OPTIONS -resize 48x48 icon48.png
convert logo.png $CONVERT_BASE_OPTIONS -resize 16x16 icon16.png
```
