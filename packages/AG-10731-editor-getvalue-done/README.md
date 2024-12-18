Notes:
Look at the `CustomCellEditor.vue` and `CustomCellEditorScriptSetup.vue` files for the custom cell editor and the issue. It is currently using script setup (as defined in the `IndexPage.vue`, line 120), which works when running in dev, but errors in production builds with `AG Grid: Framework component is missing the method getValue()`.

To reproduce:

1. First install deps
2. Run `quasar dev`,
3. Open the app, and watch the console (port displayed in the terminal, usually `9000`)
4. In the example grid, change something in the gold column, just enter in a new number and press enter

Validate that it updates correctly, and you should see a simple getValue console log in the console.

5. Now build for production with the commands below
6. Repeat step 3 and 4 (port will be `4000`)

At this point you would expect the same behavior as above, but you will see the error in the console and the value won't be updated.

To validate, on line 120 in `IndexPage.vue`, change the component to use the non-script setup version of the component, and repeat steps 5 and 6. You will see that it works as expected.

> **Note**: I've been using this project for other issues I've reported to AG Grid, so you should be able to ignore the other files and just focus on the `CustomCellEditor.vue` and `CustomCellEditorScriptSetup.vue` files.

## Install the dependencies

```bash
pnpm install
```

### Start the app in development mode

```bash
quasar dev
```

### Build and serve the app for 'production'

```bash
quasar build; quasar serve .\dist\spa\
```
