# Sheet

A mobile web sheet that replicates the Apple-style [sheet experience](https://developer.apple.com/design/human-interface-guidelines/sheets), designed to be accessible to all users.

<div style="display: flex; justify-content: center;">
  <img src="https://docs-assets.developer.apple.com/published/1f52d50425bf3c15d9fc7b46e2c99043/medium-detent-area~dark@2x.png" width="35%" style="margin-right: 10px;" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://docs-assets.developer.apple.com/published/51b039c96928a882bd7c7c743976b548/large-detent-area~dark@2x.png" width="35%" />
</div>

## Usage

Explore the [Sheet examples](https://sheet-examples.vercel.app) and view the [example code](https://github.com/hzhu/sheet-examples). To use Sheet in your project follow these instructions.

### Step 1: Install peer dependency

First, make sure you have the required peer dependency [framer-motion](https://github.com/framer/motion) installed. If you haven't installed it yet, you can do so with the following command:

```sh
npm install framer-motion
```

### Step 2: Install the library

After installing the peer dependency, proceed to install the [@sheet-ui/sheet](https://www.npmjs.com/package/@sheet-ui/sheet) package:

```sh
npm install @sheet-ui/sheet
```

### Step 3: Use the component

The component API provides consumers with a high level of rendering control through a simple interface.

```tsx
import { Sheet, SheetHeader, SheetContent } from "@sheet-ui/sheet";

function Example() {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

  return (
    <Sheet size="sm" isOpen={isOpen} onDismiss={toggle}>
      <button onClick={toggle}>Open</button>
      <SheetContent>
        <SheetHeader>Title</SheetHeader>
        <div>Some content goes here</div>
      </SheetContent>
    </Sheet>
  );
}
```

## Development

To develop `@sheet-ui/sheet`, link the local library to a local test application created with [Next.js](https://nextjs.org) or [Remix](https://remix.run). You can achieve this using `npm link` to connect your library with the test app.

To avoid issues caused by multiple React instances (such as hooks failing due to different React copies), ensure that both the library and the consumer app share the same React dependency.

In the root directory of `@sheet-ui/sheet`, run the following command to link React from your consumer app:

```sh
npm link ../my-library-consumer/node_modules/react
```

Then in the root directory of the consumer app:

```sh
npm link @sheet-ui/sheet
```

## Disclaimer

Avoid using sheets on desktop platforms; instead, opt for regular [modals](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal) in desktop applications. While drawing inspiration from Apple's operating system can be beneficial, it's important to remember that the web is a unique platform. Web design should respect its distinct nature, rather than always attempting to mimic native iOS or other operating systems entirely. Ensure you are following [web specifications](https://html.spec.whatwg.org) and [accessible web standards](https://www.w3.org/TR/wai-aria/).
